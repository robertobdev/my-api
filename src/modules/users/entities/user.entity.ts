import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
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

@Table({ tableName: 'Users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Person)
  @Column
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
  password: string;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;
}
