import { DefaultDTO } from '../../shared/interfaces/default-dto.interface';
import { Role } from '../../users/interfaces/role.interface';

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
