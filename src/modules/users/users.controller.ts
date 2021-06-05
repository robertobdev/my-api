import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { HttpResponse } from '../../utils/http-response';
import { ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Acl } from '../shared/decorators/acl.decorator';
import { AclGuard } from '../shared/guards/acl.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users')
@UseGuards(AclGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @Acl('POST_USERS')
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
    return HttpResponse.created('Usuário criado com sucesso!');
  }

  @Patch(':id')
  @Acl('UPDATE_USERS')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.update(+id, updateUserDto);
    return HttpResponse.ok('Usuário atualizado com sucesso!');
  }

  @Patch('/addresses/:userId')
  @Acl('UPDATE_USERS')
  async updateAddresses(
    @Param('userId') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateAddresses(+id, updateUserDto);
    return HttpResponse.ok('Usuário atualizado com sucesso!');
  }

  @Delete('/addresses/:addressId')
  @Acl('UPDATE_USERS')
  async deleteAddress(@Param('addressId') id: string) {
    await this.userService.removeAddress(+id);
    return HttpResponse.ok('Endereço removido com sucesso!');
  }

  @Patch('/contacts/:userId')
  @Acl('UPDATE_USERS')
  async updateContacts(
    @Param('userId') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateContacts(+id, updateUserDto);
    return HttpResponse.ok('Usuário atualizado com sucesso!');
  }

  @Delete('/contacts/:contactId')
  @Acl('UPDATE_USERS')
  async deleteContact(@Param('contactId') id: string) {
    await this.userService.removeContact(+id);
    return HttpResponse.ok('Contato removido com sucesso!');
  }
}
