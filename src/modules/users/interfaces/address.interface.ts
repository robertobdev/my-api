import { DefaultDTO } from '../../shared/interfaces/default-dto.interface';
import { User } from './user.interface';
export interface Address extends DefaultDTO {
  userId?: number;
  user?: User;
  zipcode: string;
  street: string;
  number: string;
  neighborhood: string;
  complement?: string;
  city: string;
  state: string;
  country: string;
}
