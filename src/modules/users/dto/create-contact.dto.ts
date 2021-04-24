import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { CONTACTYPE } from '../entities/contact_type.enum';

export class CreateContactDto {
  @IsString({ message: 'contactType:Campo precisa ser de texto.' })
  @IsEnum(CONTACTYPE, {
    message: `contactType:Precisar ser um dos seguites campos ${Object.keys(
      CONTACTYPE,
    )}`,
  })
  @IsNotEmpty({ message: 'contactType:Campo obrigatório.' })
  contactType: string;

  @IsString({ message: 'value:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'value:Campo obrigatório.' })
  value: string;

  @IsOptional()
  complement: string;
}
