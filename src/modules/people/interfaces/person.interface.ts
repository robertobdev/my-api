import { Address } from './address.interface';
import { Contact } from './contact.interface';
import { DefaultDTO } from './default-dto.interface';
import { GENDER } from './gender.enum';
import { User } from './user.interface';

export interface Person extends DefaultDTO {
  name: string;
  cpf: string;
  email: string;
  birthday: string;
  gender: GENDER;
  avatar: string;
  user?: User;
  addresses?: Address[];
  contacts?: Contact[];
}
