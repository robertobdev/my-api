import { User } from 'src/modules/users/interfaces/user.interface';
import { DefaultDTO } from './default-dto.interface';

export interface Contact extends DefaultDTO {
  userId?: number;
  user?: User;
  contactType: string;
  value: string;
  complement?: string;
}
