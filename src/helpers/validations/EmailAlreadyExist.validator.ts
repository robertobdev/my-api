import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Op } from 'sequelize';
import { Person } from '../../modules/people/entities/person.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class EmailAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  constructor(
    @Inject('PERSON_REPOSITORY')
    private personRepository: typeof Person,
  ) {}

  async validate(email: string, validationArguments: ValidationArguments) {
    try {
      let { id } = validationArguments.object as Person;
      if (!id) {
        id = 0;
      }
      const person = await this.personRepository.findOne({
        where: { email, id: { [Op.not]: id } },
      });
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
