import { Person } from '../modules/people/entities/person.entity';

export const personProviders = [
  {
    provide: 'PERSON_REPOSITORY',
    useValue: Person,
  },
];
