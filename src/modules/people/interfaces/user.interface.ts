import { DefaultDTO } from './default-dto.interface';
import { Person } from './person.interface';

export interface User extends DefaultDTO {
  personId?: number;
  person?: Person;
  login: string;
  password?: string;
  token?: string;
  roles: Array<number>;
}
