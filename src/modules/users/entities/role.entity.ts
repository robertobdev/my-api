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
} from 'sequelize-typescript';
import { RoleUser } from './role-user.entity';
import { User } from './user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Table({ tableName: 'roles' })
export class Role extends Model<Role> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
  @Field((type) => String)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  @Field()
  description: string;

  @BelongsToMany(() => User, () => RoleUser)
  @Field((type) => [User])
  users: User[];

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  @Field()
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  @Field()
  updatedAt: Date;
}
