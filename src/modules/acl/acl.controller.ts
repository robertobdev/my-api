import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HttpResponse } from 'src/utils/http-response';
import { AclService } from './acl.service';
import { CreateAclDto } from './dto/create-acl.dto';

@Controller('acl')
export class AclController {
  constructor(private readonly aclService: AclService) {}

  @Post()
  async create(@Body() createAclDto: CreateAclDto) {
    await this.aclService.create(createAclDto);
    return HttpResponse.created('ACL criada com sucesso!');
  }

  @Get()
  findAll() {
    return this.aclService.findAll({ limit: 0, offset: 10 });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aclService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAclDto: CreateAclDto) {
    await this.aclService.update(+id, updateAclDto);
    return HttpResponse.ok('ACL atualizado com sucesso!');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aclService.remove(+id);
  }
}
