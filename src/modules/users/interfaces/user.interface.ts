import { DefaultDTO } from '../../people/interfaces/default-dto.interface';
import { Person } from '../../people/interfaces/person.interface';

export interface User extends DefaultDTO {
  personId?: number;
  person?: Person;
  login: string;
  password?: string;
  rememberToken?: string;
  roles: any;
}
