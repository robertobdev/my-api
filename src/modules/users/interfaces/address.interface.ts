import { User } from 'src/modules/users/interfaces/user.interface';
import { DefaultDTO } from './default-dto.interface';
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
