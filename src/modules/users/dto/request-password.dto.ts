import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RequestPasswordDto {
  @ApiProperty({ example: 'julio@email.com' })
  @IsNotEmpty({ message: 'email:Campo obrigatório.' })
  email: string;
}
