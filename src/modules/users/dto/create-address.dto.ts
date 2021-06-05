import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAddressDto {
  @ApiProperty({ example: '08270-001' })
  @IsString({ message: 'zipcode:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'zipcode:Campo obrigatório.' })
  zipcode: string;

  @ApiProperty({ example: 'Avenida Afonso de Sampaio e Sousa' })
  @IsString({ message: 'street:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'street:Campo obrigatório.' })
  street: string;

  @ApiProperty({ example: '302' })
  @IsString({ message: 'number:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'number:Campo obrigatório.' })
  number: string;

  @ApiProperty({ example: 'Itaquera' })
  @IsString({ message: 'neighborhood:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'neighborhood:Campo obrigatório.' })
  neighborhood: string;

  @ApiProperty({ required: false })
  @IsOptional()
  complement: string;

  @ApiProperty({ example: 'São Paulo' })
  @IsString({ message: 'city:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'city:Campo obrigatório.' })
  city: string;

  @ApiProperty({ example: 'SP' })
  @IsString({ message: 'state:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'state:Campo obrigatório.' })
  state: string;

  @ApiProperty({ example: 'BRASIL' })
  @IsString({ message: 'country:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'country:Campo obrigatório.' })
  country: string;

  @ApiProperty({ required: false })
  @IsOptional()
  userId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  id: number;
}
