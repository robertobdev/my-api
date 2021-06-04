import {
  AllowNull,
  AutoIncrement,
  BeforeCreate,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { RoleUser } from './role-user.entity';
import { Role } from '../../acl/entities/role.entity';
import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { GENDER } from '../interfaces/gender.enum';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Address } from './address.entity';
import { Contact } from './contact.entity';
import { User as IUser } from '../interfaces/user.interface';

@ObjectType()
@Table({ tableName: 'users' })
export class User extends Model<IUser> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
  @Field(() => Int)
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

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  @Field()
  login: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  @Exclude()
  password: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING, field: 'remember_token' })
  @Field({ nullable: true })
  rememberToken: string;

  @BelongsToMany(() => Role, () => RoleUser)
  @Field(() => [Role])
  roles: Role[];

  @HasMany(() => Address, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Field(() => [Address])
  addresses: Address[];

  @HasMany(() => Contact, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Field(() => [Contact])
  contacts: Contact[];

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  @Field()
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  @Field()
  updatedAt: Date;

  @BeforeCreate
  static async hashPassword(instance: User) {
    instance.password = await hash(instance.password, 10);
  }
}
