import {
  Model,
  AllowNull,
  Column,
  Table,
  DataType,
  Unique,
  PrimaryKey,
  AutoIncrement,
  UpdatedAt,
  CreatedAt,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { RoleUser } from '../../users/entities/role-user.entity';
import { User } from '../../users/entities/user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Acl } from './acl.entity';

@ObjectType()
@Table({ tableName: 'roles' })
export class Role extends Model<Role> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
  @Field(() => Int)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  @Field()
  description: string;

  @BelongsToMany(() => User, () => RoleUser)
  @Field(() => [User])
  users: User[];

  @HasMany(() => Acl, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Field(() => Acl)
  acl?: Acl[];

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  @Field()
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  @Field()
  updatedAt: Date;
}
