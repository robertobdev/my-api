import { Person } from '../modules/users/entities/person.entity';

export const personProviders = [
  {
    provide: 'PERSON_REPOSITORY',
    useValue: Person,
  },
];
