import { DefaultDTO } from '../../people/interfaces/default-dto.interface';

export interface RoleUser extends DefaultDTO {
  userId: number;
  roleId: number;
}
