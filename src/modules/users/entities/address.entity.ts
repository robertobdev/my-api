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
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Address as IAddress } from '../interfaces/address.interface';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';
@ObjectType()
@Table({ tableName: 'addresses' })
export class Address extends Model<IAddress> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
  @Field(() => Int)
  id: number;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  @Field(() => Int)
  userId: number;

  @Field(() => User)
  @BelongsTo(() => User, {
    foreignKey: {
      name: 'user_id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  })
  user: User;

  @AllowNull(false)
  @Column(DataType.STRING)
  @Field()
  street: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  @Field()
  number: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  @Field()
  zipcode: string;

  @AllowNull(false)
  @Field()
  @Column(DataType.STRING)
  neighborhood: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  @Field({ nullable: true })
  complement: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  @Field()
  city: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  @Field()
  state: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  @Field()
  country: string;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  @Field(() => Date)
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  @Field(() => Date)
  updatedAt: Date;
}
