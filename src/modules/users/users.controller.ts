import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HttpResponse } from '../../utils/http-response';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Acl } from '../shared/decorators/acl.decorator';
import { AclGuard } from '../shared/guards/acl.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')
@UseGuards(AclGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'Create a person' })
  @ApiBadRequestResponse({
    status: 422,
    description: 'Error to create a person',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
    return HttpResponse.created('Usuário criado com sucesso!');
  }

  @Get()
  @Acl('GET_USERS')
  findAll() {
    // this.userService.findAll({ limit: 0, offset: 10 });
    return '';
  }

  @Get(':id')
  @Acl('GET_USERS')
  findOne(@Param('id') id: string) {
    // return this.userService.findOne(+id);
    return HttpResponse.ok('Usuário atualizado com sucesso!');
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: any) {
    // await this.userService.update(+id, updateUserDto);
    return HttpResponse.ok('Usuário atualizado com sucesso!');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
