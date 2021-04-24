import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @IsString({ message: 'zipcode:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'zipcode:Campo obrigatório.' })
  zipcode: string;

  @IsString({ message: 'street:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'street:Campo obrigatório.' })
  street: string;

  @IsString({ message: 'number:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'number:Campo obrigatório.' })
  number: string;

  @IsString({ message: 'neighborhood:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'neighborhood:Campo obrigatório.' })
  neighborhood: string;

  @IsOptional()
  complement: string;

  @IsString({ message: 'city:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'city:Campo obrigatório.' })
  city: string;

  @IsString({ message: 'state:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'state:Campo obrigatório.' })
  state: string;

  @IsString({ message: 'country:Campo precisa ser de texto.' })
  @IsNotEmpty({ message: 'country:Campo obrigatório.' })
  country: string;
}
