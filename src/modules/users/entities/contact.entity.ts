import {
  Model,
  AllowNull,
  Column,
  Table,
  DataType,
  Unique,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  UpdatedAt,
  CreatedAt,
} from 'sequelize-typescript';
import { CONTACTYPE } from './contact_type.enum';
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
  @Column({
    type: DataType.ENUM(
      CONTACTYPE.FIXO,
      CONTACTYPE.CELULAR,
      CONTACTYPE.FACEBOOK,
      CONTACTYPE.LINKEDIN,
      CONTACTYPE.TWITTER,
      CONTACTYPE.INSTAGRAM,
    ),
    field: 'contact_type',
  })
  contactType: CONTACTYPE;

  @AllowNull(false)
  @Column(DataType.STRING)
  value: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  complement: string;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  created_at: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  updated_at: Date;
}
