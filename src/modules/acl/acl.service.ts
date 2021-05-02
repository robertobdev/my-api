import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Acl } from './entities/acl.entity';
import { CreateAclDto } from './dto/create-acl.dto';
import { HttpResponse } from 'src/utils/http-response';
import { PaginationDB } from '../shared/interfaces/pagination.interface';
import { Modules } from './entities/module.entity';
import { Role } from './entities/role.entity';
import { Op } from 'sequelize';
import { SortInputGraphql } from '../shared/interfaces/sort.interface';
import { OrderInputGraphql } from '../shared/interfaces/order.enum';
@Injectable()
export class AclService {
  constructor(
    @InjectModel(Acl) private aclModel: typeof Acl,
    @InjectModel(Role) private roleModel: typeof Role,
    @InjectModel(Modules) private modulesModel: typeof Modules,
  ) {}
  async create(createAclDto: CreateAclDto) {
    try {
      await this.aclModel.upsert(createAclDto);
      return true;
    } catch (error) {
      throw HttpResponse.unprocessableEntity('Erro ao salvar acl!');
    }
  }

  async findAll(
    { limit, offset }: PaginationDB,
    filter = '',
    { field = 'id', order = OrderInputGraphql.ASC }: SortInputGraphql,
  ) {
    const filterConditions =
      filter !== ''
        ? {
            [Op.or]: [
              {
                '$role.description$': { [Op.like]: `%${filter}%` },
              },
              {
                '$module.title$': { [Op.like]: `%${filter}%` },
              },
            ],
          }
        : {};
    return await this.aclModel.findAndCountAll({
      distinct: true,
      include: [Modules, Role],
      limit,
      offset,
      // @ts-ignore
      where: filterConditions,
      order: [[field, order]],
    });
  }

  async findRoleAndModules() {
    const roles = await this.roleModel.findAll();
    const modules = await this.modulesModel.findAll();

    return { roles, modules };
  }

  async findOne(id: number) {
    const acl = await this.aclModel.findByPk(id);
    if (!acl) {
      throw HttpResponse.notFound('Acl não encontrada');
    }
    return acl;
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
