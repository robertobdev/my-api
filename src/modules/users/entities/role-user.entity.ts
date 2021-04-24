import {
  Model,
  Column,
  Table,
  DataType,
  UpdatedAt,
  CreatedAt,
  ForeignKey,
} from 'sequelize-typescript';
import { Role } from './role.entity';
import { User } from './user.entity';

@Table({ tableName: 'roles_users' })
export class RoleUser extends Model<RoleUser> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, field: 'user_id' })
  userId: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, field: 'role_id' })
  roleId: number;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;
}
