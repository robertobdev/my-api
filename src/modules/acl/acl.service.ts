import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Acl } from './entities/acl.entity';
import { CreateAclDto } from './dto/create-acl.dto';
import { HttpResponse } from 'src/utils/http-response';
import { PaginationDB } from '../shared/interfaces/pagination.interface';
import { Modules } from './entities/module.entity';
import { Role } from '../users/entities/role.entity';

@Injectable()
export class AclService {
  constructor(@InjectModel(Acl) private aclModel: typeof Acl) {}
  async create(createAclDto: CreateAclDto) {
    try {
      await this.aclModel.upsert(createAclDto);
      return true;
    } catch (error) {
      throw HttpResponse.unprocessableEntity('Erro ao salvar acl!');
    }
  }

  async findAll({ limit, offset }: PaginationDB) {
    return await this.aclModel.findAndCountAll({
      distinct: true,
      include: [Modules, Role],
      limit,
      offset,
    });
  }

  async findOne(id: number) {
    const acl = await this.aclModel.findByPk(id);
    if (!acl) {
      throw HttpResponse.notFound('Acl não encontrada');
    }
    return true;
  }

  async update(id: number, updateAclDto: CreateAclDto) {
    try {
      const acl = await this.aclModel.findByPk(id);
      await acl.update(updateAclDto);
      return true;
    } catch (error) {
      console.log(error);
      throw HttpResponse.unprocessableEntity('Erro ao atualizar acl!');
    }
  }

  async remove(id: number) {
    try {
      const acl = await this.aclModel.findByPk(id);
      await acl.destroy();
      return true;
    } catch (error) {
      console.log(error);
      throw HttpResponse.unprocessableEntity('Erro ao excluir acl!');
    }
  }
}
