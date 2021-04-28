import {
  AllowNull,
  Column,
  Table,
  DataType,
  Unique,
  PrimaryKey,
  AutoIncrement,
  UpdatedAt,
  CreatedAt,
  ForeignKey,
  BelongsTo,
  Model,
} from 'sequelize-typescript';
import { Role } from 'src/modules/users/entities/role.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Modules } from './module.entity';
import { Acl as IAcl } from '../interfaces/acl.interface';

@ObjectType()
@Table({ tableName: 'acl' })
export class Acl extends Model<IAcl> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
  @Field(() => Int)
  id: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.NUMBER, field: 'role_id' })
  @Field(() => Int)
  roleId: number;

  @BelongsTo(() => Role, {
    foreignKey: {
      name: 'roleId',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  })
  @Field(() => Role)
  role: Role;

  @ForeignKey(() => Modules)
  @Column({ type: DataType.NUMBER, field: 'module_id' })
  @Field(() => Int)
  moduleId: number;

  @BelongsTo(() => Modules, {
    foreignKey: {
      name: 'moduleId',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  })
  @Field(() => Modules)
  module: Modules;

  @AllowNull(false)
  @Column({ type: DataType.BOOLEAN, field: 'is_show' })
  @Field()
  isShow: boolean;

  @AllowNull(false)
  @Column({ type: DataType.BOOLEAN, field: 'is_get' })
  @Field()
  isGet: boolean;

  @AllowNull(false)
  @Column({ type: DataType.BOOLEAN, field: 'is_post' })
  @Field()
  isPost: boolean;

  @AllowNull(false)
  @Column({ type: DataType.BOOLEAN, field: 'is_update' })
  @Field()
  isUpdate: boolean;

  @AllowNull(false)
  @Column({ type: DataType.BOOLEAN, field: 'is_delete' })
  @Field()
  isDelete: boolean;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  @Field()
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  @Field()
  updatedAt: Date;
}
