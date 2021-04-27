import { Acl } from 'src/modules/acl/interfaces/acl.interface';
import { DefaultDTO } from '../../people/interfaces/default-dto.interface';
import { RoleUser } from './role-user.interface';

export interface Role extends DefaultDTO {
  description: string;
  acl: Acl[];
  roleUser: RoleUser;
}
