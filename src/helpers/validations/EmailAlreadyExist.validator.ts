import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Op } from 'sequelize';
import { User } from 'src/modules/users/entities/user.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class EmailAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
  ) {}

  async validate(email: string, validationArguments: ValidationArguments) {
    try {
      let { id } = validationArguments.object as User;
      if (!id) {
        id = 0;
      }
      const user = await this.userRepository.findOne({
        where: { email, id: { [Op.not]: id } },
      });
      return !!!user;
    } catch (e) {
      return false;
    }
  }
}

export function EmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailAlreadyExistConstraint,
    });
  };
}
