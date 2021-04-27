import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AclService } from './acl.service';
import { CreateAclDto } from './dto/create-acl.dto';
import { UpdateAclDto } from './dto/update-acl.dto';

@Controller('acl')
export class AclController {
  constructor(private readonly aclService: AclService) {}

  @Post()
  create(@Body() createAclDto: CreateAclDto) {
    return this.aclService.create(createAclDto);
  }

  @Get()
  findAll() {
    return this.aclService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aclService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAclDto: UpdateAclDto) {
    return this.aclService.update(+id, updateAclDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aclService.remove(+id);
  }
}
