import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RequestPasswordDto {
  @ApiProperty({ example: 'julio@email.com' })
  @IsNotEmpty({ message: 'login:Campo obrigatório.' })
  login: string;
}
