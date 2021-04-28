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
  Model,
  HasOne,
} from 'sequelize-typescript';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Acl } from './acl.entity';

@ObjectType()
@Table({ tableName: 'modules' })
export class Modules extends Model<Modules> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
  @Field(() => Int)
  id: number;

  @HasOne(() => Acl, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Field(() => Acl)
  acl?: Acl;

  @AllowNull(false)
  @Column(DataType.STRING)
  @Field()
  title: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  @Field()
  router: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  @Field()
  description: string;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  @Field()
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  @Field()
  updatedAt: Date;
}
