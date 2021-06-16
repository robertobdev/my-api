import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ChangePasswordDto {
  @ApiProperty({ example: '123456' })
  @IsNotEmpty({ message: 'password:Campo obrigatório.' })
  currentPassword: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty({ message: 'password:Campo obrigatório.' })
  newPassword: string;
}
