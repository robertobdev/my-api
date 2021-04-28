import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginUserDto {
  @ApiProperty({ example: 'admin@admin.com' })
  @IsNotEmpty({ message: 'login:Campo obrigatório.' })
  login: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty({ message: 'password:Campo obrigatório.' })
  password: string;
}
