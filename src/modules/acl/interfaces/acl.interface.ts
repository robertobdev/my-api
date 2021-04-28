import { Role } from 'src/modules/users/interfaces/role.interface';
import { DefaultDTO } from '../../people/interfaces/default-dto.interface';

export interface Acl extends DefaultDTO {
  id?: number;
  roleId: number;
  moduleId: number;
  isShow?: boolean;
  isGet?: boolean;
  isPost?: boolean;
  isUpdate?: boolean;
  isDelete?: boolean;
  role?: Role;
  module?: any;
}
