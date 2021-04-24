import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Person } from 'src/modules/users/entities/person.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class CpfAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject('PERSON_REPOSITORY')
    private personRepository: typeof Person,
  ) {}

  validate(cpf: string) {
    return this.personRepository.findOne({ where: { cpf } }).then((person) => {
      if (person) return false;
      return true;
    });
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
