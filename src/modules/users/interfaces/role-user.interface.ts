import { DefaultDTO } from 'src/modules/shared/interfaces/default-dto.interface';

export interface RoleUser extends DefaultDTO {
  userId: number;
  roleId: number;
}
