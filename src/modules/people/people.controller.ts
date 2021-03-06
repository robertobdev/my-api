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
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
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
@Controller('people')
@UseGuards(AclGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  @ApiBody({ type: CreatePersonDto })
  @ApiCreatedResponse({ description: 'Create a person' })
  @ApiBadRequestResponse({
    status: 422,
    description: 'Error to create a person',
  })
  async create(@Body() createPersonDto: CreatePersonDto) {
    await this.peopleService.create(createPersonDto);
    return HttpResponse.created('Usuário criado com sucesso!');
  }

  @Get()
  @Acl('GET_USERS')
  findAll() {
    return this.peopleService.findAll({ limit: 0, offset: 10 });
  }

  @Get(':id')
  @Acl('GET_USERS')
  findOne(@Param('id') id: string) {
    return this.peopleService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    await this.peopleService.update(+id, updatePersonDto);
    return HttpResponse.ok('Usuário atualizado com sucesso!');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleService.remove(+id);
  }
}
