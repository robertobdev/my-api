import { Injectable } from '@nestjs/common';
import { CreateAclDto } from './dto/create-acl.dto';
import { UpdateAclDto } from './dto/update-acl.dto';

@Injectable()
export class AclService {
  create(createAclDto: CreateAclDto) {
    return 'This action adds a new acl';
  }

  findAll() {
    return `This action returns all acl`;
  }

  findOne(id: number) {
    return `This action returns a #${id} acl`;
  }

  update(id: number, updateAclDto: UpdateAclDto) {
    return `This action updates a #${id} acl`;
  }

  remove(id: number) {
    return `This action removes a #${id} acl`;
  }
}
