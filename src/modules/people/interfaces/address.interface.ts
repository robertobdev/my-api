import { DefaultDTO } from './default-dto.interface';
import { Person } from './person.interface';

export interface Address extends DefaultDTO {
  personId?: number;
  person?: Person;
  zipcode: string;
  street: string;
  number: string;
  neighborhood: string;
  complement?: string;
  city: string;
  state: string;
  country: string;
}
