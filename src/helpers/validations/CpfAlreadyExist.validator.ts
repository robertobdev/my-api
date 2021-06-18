import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Op } from 'sequelize';
import { User } from '../../modules/users/entities/user.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class CpfAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
  ) {}

  async validate(cpf: string, validationArguments: ValidationArguments) {
    let { id } = validationArguments.object as User;
    if (!id) {
      id = 0;
    }
    try {
      const user = await this.userRepository.findOne({
        where: { cpf, id: { [Op.not]: id } },
      });
      return !!!user;
    } catch (e) {
      return false;
    }
  }
}

export function CpfAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CpfAlreadyExistConstraint,
    });
  };
}
