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
export class CpfAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject('PERSON_REPOSITORY')
    private personRepository: typeof Person,
  ) {}

  async validate(cpf: string) {
    try {
      const person = await this.personRepository.findOne({ where: { cpf } });
      return !!!person;
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
