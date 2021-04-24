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

@Table({ tableName: 'addresses' })
export class Address extends Model<Address> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Person)
  @Column({ field: 'person_id' })
  personId: number;

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
  street: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  number: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  zipcode: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  neighborhood: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  complement: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  city: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  state: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  country: string;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;
}
