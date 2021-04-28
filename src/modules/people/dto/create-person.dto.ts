import {
  IsEmail,
  IsNotEmpty,
  IsDateString,
  IsEnum,
  IsString,
  ValidateNested,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  CpfAlreadyExist,
  EmailAlreadyExist,
} from '../../../helpers/validations';
import { GENDER } from '../interfaces/gender.enum';
import { CreateAddressDto } from './create-address.dto';
import { CreateContactDto } from './create-contact.dto';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePersonDto {
  @ApiProperty({ example: 'Julio Eduardo Joaquim Lima' })
  @IsString({ message: 'name:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'name:Campo obrigatório.' })
  name: string;

  @ApiProperty({ example: '398.686.904-20' })
  @IsString({ message: 'cpf:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'cpf:Campo obrigatório' })
  @CpfAlreadyExist({ message: 'cpf:Esse Cpf já está cadastrado' })
  cpf: string;

  @ApiProperty({ example: 'julio@email.com' })
  @EmailAlreadyExist({ message: 'email:Esse Email já está cadastrado' })
  @IsEmail({}, { message: 'email:E-mail fora do formato.' })
  @IsNotEmpty({ message: 'email:Campo obrigatório.' })
  email: string;

  @ApiProperty({ example: '1990-08-10' })
  @IsDateString({}, { message: 'birthday:Data nascimento fora do formato.' })
  @IsNotEmpty({ message: 'birthday:Campo obrigatório.' })
  birthday: string;

  @ApiProperty({ enum: GENDER, example: 'MALE' })
  @IsString({ message: 'gender:Campo precisa ser de texto.' })
  @IsEnum(GENDER, {
    message: `gender:Precisar ser um dos seguites campos ${Object.keys(
      GENDER,
    )}`,
  })
  @IsNotEmpty({ message: 'gender:Campo obrigatório.' })
  gender: GENDER;

  @ApiProperty({
    example:
      'https://thumbs.dreamstime.com/b/opte-pelo-avatar-placeholder-da-foto-%C3%ADcone-do-perfil-124557887.jpg',
  })
  @IsString({ message: 'avatar:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'avatar:Campo obrigatório.' })
  avatar: string;

  @ApiProperty({ type: CreateUserDto })
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  @IsNotEmpty({ message: 'user:Campo obrigatório.' })
  user: CreateUserDto;

  @ApiProperty({ type: [CreateAddressDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  @ArrayNotEmpty({ message: 'addresses:Campo está vazio.' })
  @IsArray({ message: 'addresses:Campo precisa ser um array' })
  @IsNotEmpty({ message: 'addresses:Campo obrigatório.' })
  addresses: CreateAddressDto[];

  @ApiProperty({ type: [CreateContactDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateContactDto)
  @ArrayNotEmpty({ message: 'contacts:Campo está vazio.' })
  @IsArray({ message: 'contacts:Campo precisa ser um array' })
  @IsNotEmpty({ message: 'contacts:Campo obrigatório.' })
  contacts: CreateContactDto[];
}
