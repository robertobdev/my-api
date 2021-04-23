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
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ContactType } from './contact_type.enum';
import { Person } from './person.entity';

@Table({ tableName: 'contacts' })
export class Contact extends Model<Contact> {
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
  @Column({
    type: DataType.ENUM(
      ContactType.FIXO,
      ContactType.CELULAR,
      ContactType.FACEBOOK,
      ContactType.LINKEDIN,
      ContactType.TWITTER,
      ContactType.INSTAGRAM,
    ),
    field: 'contact_type',
  })
  contactType: ContactType;

  @AllowNull(false)
  @Column(DataType.STRING)
  value: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  complement: string;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;
}
