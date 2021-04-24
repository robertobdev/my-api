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
import { GENDER } from '../entities/gender.enum';
import { CreateAddressDto } from './create-address.dto';
import { CreateContactDto } from './create-contact.dto';
export class CreateUserDto {
  @IsString({ message: 'name:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'name:Campo obrigatório.' })
  name: string;

  @IsString({ message: 'cpf:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'cpf:Campo obrigatório' })
  @CpfAlreadyExist({ message: 'cpf:Esse Cpf já está cadastrado' })
  cpf: string;

  @EmailAlreadyExist({ message: 'email:Esse Email já está cadastrado' })
  @IsEmail({}, { message: 'email:E-mail fora do formato.' })
  @IsNotEmpty({ message: 'email:Campo obrigatório.' })
  email: string;

  @IsDateString({}, { message: 'birthday:Data nascimento fora do formato.' })
  @IsNotEmpty({ message: 'birthday:Campo obrigatório.' })
  birthday: string;

  @IsString({ message: 'gender:Campo precisa ser de texto.' })
  @IsEnum(GENDER, {
    message: `gender:Precisar ser um dos seguites campos ${Object.keys(
      GENDER,
    )}`,
  })
  @IsNotEmpty({ message: 'gender:Campo obrigatório.' })
  gender: string;

  @IsString({ message: 'avatar:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'avatar:Campo obrigatório.' })
  avatar: string;

  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  @ArrayNotEmpty({ message: 'addresses:Campo está vazio.' })
  @IsArray({ message: 'addresses:Campo precisa ser um array' })
  @IsNotEmpty({ message: 'addresses:Campo obrigatório.' })
  addresses: CreateAddressDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateContactDto)
  @ArrayNotEmpty({ message: 'contacts:Campo está vazio.' })
  @IsArray({ message: 'contacts:Campo precisa ser um array' })
  @IsNotEmpty({ message: 'contacts:Campo obrigatório.' })
  contacts: CreateContactDto[];
}
