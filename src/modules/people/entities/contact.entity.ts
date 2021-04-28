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
import { CONTACTYPE } from '../interfaces/contact_type.enum';
import { Person } from './person.entity';
import { Contact as IContact } from '../interfaces';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Table({ tableName: 'contacts' })
export class Contact extends Model<IContact> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
  @Field(() => Int)
  id: number;

  @ForeignKey(() => Person)
  @Column({ field: 'person_id' })
  @Field(() => Int)
  personId: number;

  @BelongsTo(() => Person, {
    foreignKey: {
      name: 'person_id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  })
  @Field(() => Person)
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
  @Field()
  contactType: CONTACTYPE;

  @AllowNull(false)
  @Column(DataType.STRING)
  @Field()
  value: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  @Field({ nullable: true })
  complement: string;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  @Field()
  created_at: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  @Field()
  updated_at: Date;
}
