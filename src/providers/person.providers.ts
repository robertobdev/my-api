import { Person } from 'src/modules/users/entities/person.entity';

export const personProviders = [
  {
    provide: 'PERSON_REPOSITORY',
    useValue: Person,
  },
];
