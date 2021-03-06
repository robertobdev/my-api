import {
  AllowNull,
  AutoIncrement,
  BeforeCreate,
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { Person } from '../../people/entities/person.entity';
import { RoleUser } from './role-user.entity';
import { Role } from './role.entity';
import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { User as IUser } from '../../people/interfaces';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Table({ tableName: 'users' })
export class User extends Model<IUser> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
  @Field(() => Int)
  id: number;

  @ForeignKey(() => Person)
  @Column({ type: DataType.NUMBER, field: 'person_id' })
  @Field(() => Int)
  personId: number;

  @BelongsTo(() => Person, {
    foreignKey: {
      name: 'personId',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  })
  @Field(() => Person)
  person: Person;

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
