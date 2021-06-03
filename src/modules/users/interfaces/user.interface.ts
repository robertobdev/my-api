import { Address } from './address.interface';
import { Contact } from './contact.interface';
import { DefaultDTO } from '../../shared/interfaces/default-dto.interface';
import { GENDER } from './gender.enum';

export interface User extends DefaultDTO {
  name: string;
  cpf: string;
  email: string;
  birthday: string;
  gender: GENDER;
  avatar: string;
  addresses?: Address[];
  contacts?: Contact[];
  login: string;
  password?: string;
  rememberToken?: string;
  roles: any;
}
