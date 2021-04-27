import { DefaultDTO } from './default-dto.interface';
import { Person } from './person.interface';

export interface Contact extends DefaultDTO {
  personId?: number;
  person?: Person;
  contactType: string;
  value: string;
  complement?: string;
}
