import { IsNotEmpty, IsInt, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAclDto {
  @ApiProperty({ example: 1 })
  @IsInt({ message: 'roleId:Campo precisa ser inteiro.' })
  @IsNotEmpty({ message: 'roleId:Campo obrigatório.' })
  roleId: number;

  @ApiProperty({ example: 1 })
  @IsInt({ message: 'moduleId:Campo precisa ser inteiro.' })
  @IsNotEmpty({ message: 'moduleId:Campo obrigatório.' })
  moduleId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isShow: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isGet: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isPost: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isUpdate: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isDelete: boolean;
}
