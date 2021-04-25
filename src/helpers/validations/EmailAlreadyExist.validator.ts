import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Person } from '../../modules/users/entities/person.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class EmailAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  constructor(
    @Inject('PERSON_REPOSITORY')
    private personRepository: typeof Person,
  ) {}

  async validate(email: string) {
    try {
      const person = await this.personRepository.findOne({ where: { email } });
      return !!!person;
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
