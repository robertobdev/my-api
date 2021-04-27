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
export class CpfAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject('PERSON_REPOSITORY')
    private personRepository: typeof Person,
  ) {}

  async validate(cpf: string, validationArguments: ValidationArguments) {
    let { id } = validationArguments.object as Person;
    if (!id) {
      id = 0;
    }
    try {
      const person = await this.personRepository.findOne({
        where: { cpf, id: { [Op.not]: id } },
      });
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
