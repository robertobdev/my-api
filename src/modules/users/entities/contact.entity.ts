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
import { Contact as IContact } from '../interfaces/contact.interface';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

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

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  @Field(() => Int)
  userId: number;

  @BelongsTo(() => User, {
    foreignKey: {
      name: 'user_id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  })
  @Field(() => User)
  user: User;

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
