/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { compareSync } from 'bcrypt';
import { HttpResponse } from 'src/utils/http-response';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { RequestPasswordDto } from './dto/request-password.dto';
import { Contact } from './entities/contact.entity';
import { Address } from './entities/address.entity';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDB } from '../shared/interfaces/pagination.interface';
import { OrderInputGraphql } from '../shared/interfaces/order.enum';
import { SortInputGraphql } from '../shared/interfaces/sort.interface';
import { Role } from '../acl/entities/role.entity';
import { Acl } from '../acl/entities/acl.entity';
import { Modules } from '../acl/entities/module.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Contact) private contactsModel: typeof Contact,
    @InjectModel(Address) private addressesModel: typeof Address,
    private sequelize: Sequelize,
  ) {}

  async create(@Body() createUserDto: CreateUserDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const user = await this.userModel.create(createUserDto, {
        include: [Address, Contact],
        transaction,
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user.addRoles(createUserDto.roles);

      await transaction.commit();

      return true;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw HttpResponse.unprocessableEntity('Erro ao salvar usuário!');
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
                name: { [Op.like]: `%${filter}%` },
              },
              {
                cpf: { [Op.like]: `%${filter}%` },
              },
              {
                email: { [Op.like]: `%${filter}%` },
              },
              {
                '$user.login$': { [Op.like]: `%${filter}%` },
              },
            ],
          }
        : {};
    return await this.userModel.findAndCountAll({
      distinct: true,
      limit,
      offset,
      // @ts-ignore
      where: filterConditions,
      order: [[field, order]],
    });
  }

  async findByLogin(userLogin: LoginUserDto): Promise<User> {
    const { login, password } = userLogin;
    const user = await this.userModel.findOne({
      where: { login },
      attributes: ['id', 'password'],
    });
    if (!user || !compareSync(password, user.password)) {
      throw HttpResponse.badRequest('Dados incorretos!');
    }
    return user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id, {
      include: [Address, Contact, Role],
    });
    if (!user) {
      throw HttpResponse.notFound('Usuário não encontrada');
    }
    return user;
  }
  async getAclPermissionsByUser(userId: number) {
    const user = await this.userModel.findOne({
      where: { id: userId },
      include: [
        {
          model: Role,
          attributes: ['id', 'description'],
          include: [
            {
              model: Acl,
              include: [
                {
                  model: Modules,
                  attributes: ['description', 'title', 'router', 'submenus'],
                },
              ],
              attributes: ['isShow', 'isGet', 'isPost', 'isUpdate', 'isDelete'],
            },
          ],
        },
      ],
      attributes: ['id', 'name', 'avatar'],
    });
    if (!user) {
      throw HttpResponse.notFound('Usuário não encontrada');
    }
    const decodedUser = user.toJSON() as User;
    let acl = [];
    let modules = [];
    for (const role of decodedUser.roles) {
      const aclToGuard = role.acl
        .reduce((acc, current) => {
          const keys = Object.keys(current);
          const arrays = keys
            .join(`_${current.module.description},`)
            .split(',');
          arrays.pop();
          acc = [...arrays, ...acc];
          modules = [...modules, current.module];
          return acc;
        }, [])
        .map((acl: string) => acl.toUpperCase().replace('IS', ''));

      acl = [...acl, ...aclToGuard];
    }
    return {
      id: userId,
      name: decodedUser.name,
      avatar: decodedUser.avatar,
      modules: this.removeDuplicateModule(modules),
      acl: [...new Set(acl)],
    };
  }

  async requestPassword({ login }: RequestPasswordDto) {
    const user = await this.userModel.findOne({
      where: { login },
    });
    if (!user) {
      return null;
    }
    const random = await promisify(randomBytes)(16);
    const rememberToken = random.toString('hex');

    await user.update({ rememberToken });

    return { email: user.email, rememberToken };
  }
  //TODO: Update User
  // async update(id: number, updatePersonDto: UpdatePersonDto) {
  //   const transaction = await this.sequelize.transaction();
  //   try {
  //     const person = await this.personModel.findByPk(id, {
  //       include: [Contact, Address, User],
  //     });

  //     //TODO: Make this code a new class

  //     const toSave = [];

  //     const dtoKeys = Object.keys(updatePersonDto);
  //     const associations = Object.keys(this.personModel.associations);

  //     dtoKeys.forEach((key) => {
  //       const hasAssociation = associations.includes(key);
  //       if (!hasAssociation) {
  //         return;
  //       }
  //       updatePersonDto[key].forEach(async (contact: IContact) => {
  //         if (contact.id) {
  //           const finded = person[key]?.find(({ id }) => contact.id === id);
  //           finded?.update(contact);
  //           return;
  //         }
  //         toSave.push(
  //           this[`${key}Model`]?.create({ ...contact, personId: person.id }),
  //         );
  //       });
  //     });

  //     person.update(updatePersonDto);

  //     await Promise.all(toSave);
  //     await transaction.commit();
  //     return true;
  //   } catch (error) {
  //     await transaction.rollback();
  //     throw HttpResponse.unprocessableEntity('Erro ao atualizar usuário!');
  //   }
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private removeDuplicateModule(duplicates): Array<any> {
    const map = {};
    const uniqueArr = [];
    duplicates.forEach((duplicate) => {
      if (!map[JSON.stringify(duplicate)]) {
        map[JSON.stringify(duplicate)] = true;
        uniqueArr.push(duplicate);
      }
    });
    return uniqueArr;
  }
}
