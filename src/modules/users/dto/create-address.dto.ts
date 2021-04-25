import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAddressDto {
  @ApiProperty()
  @IsString({ message: 'zipcode:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'zipcode:Campo obrigatório.' })
  zipcode: string;

  @ApiProperty()
  @IsString({ message: 'street:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'street:Campo obrigatório.' })
  street: string;

  @ApiProperty()
  @IsString({ message: 'number:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'number:Campo obrigatório.' })
  number: string;

  @ApiProperty()
  @IsString({ message: 'neighborhood:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'neighborhood:Campo obrigatório.' })
  neighborhood: string;

  @ApiProperty({ required: false })
  @IsOptional()
  complement: string;

  @ApiProperty()
  @IsString({ message: 'city:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'city:Campo obrigatório.' })
  city: string;

  @ApiProperty()
  @IsString({ message: 'state:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'state:Campo obrigatório.' })
  state: string;

  @ApiProperty()
  @IsString({ message: 'country:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'country:Campo obrigatório.' })
  country: string;
}
