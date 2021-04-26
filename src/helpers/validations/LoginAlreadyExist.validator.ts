import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from '../../modules/users/entities/user.entity';
import { Op } from 'sequelize';
import { Person } from 'src/modules/users/entities/person.entity';
@ValidatorConstraint({ async: true })
@Injectable()
export class LoginAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  constructor(
    @Inject('USER_REPOSITORY')
    private user: typeof User,
  ) {}

  async validate(login: string, validationArguments: ValidationArguments) {
    let { id } = validationArguments.object as Person;
    if (!id) {
      id = 0;
    }
    try {
      const user = await this.user.findOne({
        where: { login, personId: { [Op.not]: id } },
      });
      return !!!user;
    } catch (e) {
      return false;
    }
  }
}

export function LoginAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: LoginAlreadyExistConstraint,
    });
  };
}
