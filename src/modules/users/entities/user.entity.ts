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
import { Person } from './person.entity';
import { RoleUser } from './role-user.entity';
import { Role } from './role.entity';
import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
@Table({ tableName: 'users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Person)
  @Column({ type: DataType.NUMBER, field: 'person_id' })
  personId: number;

  @BelongsTo(() => Person, {
    foreignKey: {
      name: 'personId',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  })
  person: Person;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  login: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  @Exclude({ toPlainOnly: true })
  password: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  token: string;

  @BelongsToMany(() => Role, () => RoleUser)
  roles: Role[];

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;

  @BeforeCreate
  static async hashPassword(instance: User) {
    instance.password = await hash(instance.password, 10);
  }
}
