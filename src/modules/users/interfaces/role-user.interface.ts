import { DefaultDTO } from '../../shared/interfaces/default-dto.interface';

export interface RoleUser extends DefaultDTO {
  userId: number;
  roleId: number;
}
