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
import { Person } from './person.entity';
import { Address as IAddress } from '../interfaces';
import { Field, Int, ObjectType } from '@nestjs/graphql';
@ObjectType()
@Table({ tableName: 'addresses' })
export class Address extends Model<IAddress> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
  @Field((type) => Int)
  id: number;

  @ForeignKey(() => Person)
  @Column({ field: 'person_id' })
  @Field((type) => Int)
  personId: number;

  @Field((type) => Person)
  @BelongsTo(() => Person, {
    foreignKey: {
      name: 'person_id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  })
  person: Person;

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
  @Field((type) => Date)
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  @Field((type) => Date)
  updatedAt: Date;
}
