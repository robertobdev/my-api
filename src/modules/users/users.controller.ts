import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { HttpResponse } from '../../utils/http-response';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreatePersonDto })
  @ApiCreatedResponse({ description: 'Create a person' })
  @ApiBadRequestResponse({
    status: 422,
    description: 'Error to create a person',
  })
  async create(@Body() createPersonDto: CreatePersonDto) {
    await this.usersService.create(createPersonDto);
    return HttpResponse.created('Usuário criado com sucesso!');
  }

  @Get()
  findAll() {
    return this.usersService.findAll({ limit: 0, offset: 10 });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    await this.usersService.update(+id, updatePersonDto);
    return HttpResponse.ok('Usuário atualizado com sucesso!');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
