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
import { Person as IPerson, GENDER } from '../interfaces/';
import { User } from './user.entity';

@Table({ tableName: 'people' })
export class Person extends Model<IPerson> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
  id?: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  cpf: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  birthday: Date;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(GENDER.MALE, GENDER.FEMALE, GENDER.OTHER),
  })
  gender: GENDER;

  @AllowNull(false)
  @Column(DataType.STRING)
  avatar: string;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt?: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt?: Date;

  @HasOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user?: User;

  @HasMany(() => Address, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  addresses: Address[];

  @HasMany(() => Contact, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  contacts: Contact[];
}
