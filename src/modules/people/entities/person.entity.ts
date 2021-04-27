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
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Address } from './address.entity';
import { Contact } from './contact.entity';
import { Person as IPerson, GENDER } from '../interfaces';
import { User } from './user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
@ObjectType()
@Table({ tableName: 'people' })
export class Person extends Model<IPerson> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
  @Field((type) => Int)
  id?: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  @Field()
  name: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  @Field()
  cpf: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  @Field()
  email: string;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  @Field()
  birthday: Date;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(GENDER.MALE, GENDER.FEMALE, GENDER.OTHER),
  })
  @Field()
  gender: GENDER;

  @AllowNull(false)
  @Column(DataType.STRING)
  @Field()
  avatar: string;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  @Field()
  createdAt?: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  @Field()
  updatedAt?: Date;

  @HasOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Field((type) => User)
  user?: User;

  @HasMany(() => Address, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Field((type) => [Address])
  addresses: Address[];

  @HasMany(() => Contact, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Field((type) => [Contact])
  contacts: Contact[];
}
