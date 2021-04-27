import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { CONTACTYPE } from '../interfaces/contact_type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ enum: CONTACTYPE, example: 'CELULAR' })
  @IsString({ message: 'contactType:Campo precisa ser de texto.' })
  @IsEnum(CONTACTYPE, {
    message: `contactType:Precisar ser um dos seguites campos ${Object.keys(
      CONTACTYPE,
    )}`,
  })
  @IsNotEmpty({ message: 'contactType:Campo obrigatório.' })
  contactType: string;

  @ApiProperty({ example: '(11) 992-150-179' })
  @IsString({ message: 'value:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'value:Campo obrigatório.' })
  value: string;

  @ApiProperty({ required: false })
  @IsOptional()
  complement: string;
}
