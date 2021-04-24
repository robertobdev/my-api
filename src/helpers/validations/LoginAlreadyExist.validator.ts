import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from 'src/modules/users/entities/user.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class LoginAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  constructor(
    @Inject('USER_REPOSITORY')
    private user: typeof User,
  ) {}

  async validate(login: string) {
    try {
      const user = await this.user.findOne({ where: { login } });
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
