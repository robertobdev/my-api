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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { HttpResponse } from 'src/utils/http-response';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Acl } from '../shared/decorators/acl.decorator';
import { AclGuard } from '../shared/guards/acl.guard';
import { AclService } from './acl.service';
import { CreateAclDto } from './dto/create-acl.dto';

@Controller('acl')
@UseGuards(AclGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AclController {
  constructor(private readonly aclService: AclService) {}

  @Post()
  @ApiBody({ type: CreateAclDto })
  @ApiCreatedResponse({ description: 'Create a new acl' })
  @ApiBadRequestResponse({
    status: 422,
    description: 'Error to create a clt',
  })
  @Acl('POST_USERS')
  async create(@Body() createAclDto: CreateAclDto) {
    await this.aclService.create(createAclDto);
    return HttpResponse.created('ACL criada com sucesso!');
  }

  @Get()
  @Acl('GET_USERS')
  findAll() {
    return this.aclService.findAll({ limit: 0, offset: 10 });
  }

  @Get(':id')
  @Acl('GET_USERS')
  findOne(@Param('id') id: string) {
    return this.aclService.findOne(+id);
  }

  @Patch(':id')
  @Acl('UPDATE_USERS')
  async update(@Param('id') id: string, @Body() updateAclDto: CreateAclDto) {
    await this.aclService.update(+id, updateAclDto);
    return HttpResponse.ok('ACL atualizado com sucesso!');
  }

  @Delete(':id')
  @Acl('DELETE_USERS')
  async remove(@Param('id') id: string) {
    await this.aclService.remove(+id);
    return HttpResponse.ok('ACL excluida com sucesso!');
  }
}
