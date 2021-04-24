import { IsNotEmpty, MinLength, ArrayNotEmpty, IsArray } from 'class-validator';
import { LoginAlreadyExist } from 'src/helpers/validations';

export class CreateUserDto {
  @LoginAlreadyExist({ message: 'login:Esse login já está cadastrado' })
  @IsNotEmpty({ message: 'login:Campo obrigatório.' })
  login: string;

  @IsNotEmpty({ message: 'password:Campo obrigatório.' })
  @MinLength(5, {
    message: 'password:A senha precisa ter, no mínimo, 6 caracteres.',
  })
  password: string;

  @ArrayNotEmpty({ message: 'roles:Campo está vazio.' })
  @IsArray({ message: 'roles:Campo precisa ser um array' })
  @IsNotEmpty({ message: 'roles:Campo obrigatório.' })
  roles: Array<number>;
}
