import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { HttpResponse } from '../../utils/http-response';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Address } from './entities/address.entity';
import { Contact } from './entities/contact.entity';
import { Person } from './entities/person.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Person) private personModel: typeof Person,
    private sequelize: Sequelize,
  ) {}

  async create(@Body() createPersonDto: CreatePersonDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const person = await this.personModel.create(createPersonDto, {
        include: [Address, Contact, User],
        transaction,
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      person.user.addRoles(createPersonDto.user.roles);

      await transaction.commit();

      return true;
    } catch (error) {
      await transaction.rollback();
      throw HttpResponse.unprocessableEntity('Erro ao salvar usuário!');
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return await this.personModel.findByPk(id, { raw: true, nest: true });
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
