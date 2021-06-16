import { DefaultDTO } from '../../shared/interfaces/default-dto.interface';
import { User } from './user.interface';

export interface Contact extends DefaultDTO {
  userId?: number;
  user?: User;
  contactType: string;
  value: string;
  complement?: string;
}
