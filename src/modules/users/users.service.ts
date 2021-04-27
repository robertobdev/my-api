import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { HttpResponse } from '../../utils/http-response';
import { PaginationDB } from '../shared/interfaces/pagination.interface';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Address } from './entities/address.entity';
import { Contact } from './entities/contact.entity';
import { Person } from './entities/person.entity';
import { User } from './entities/user.entity';
import { Contact as IContact } from './interfaces/contact.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Person) private personModel: typeof Person,
    @InjectModel(Contact) private contactsModel: typeof Contact,
    @InjectModel(Address) private addressesModel: typeof Address,
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
      console.log(error);
      await transaction.rollback();
      throw HttpResponse.unprocessableEntity('Erro ao salvar usuário!');
    }
  }

  async findAll({ limit, offset }: PaginationDB) {
    const people = await this.personModel.findAndCountAll({
      include: [Address, Contact, User],
      distinct: true,
      limit,
      offset,
    });
    return people;
  }

  async findOne(id: number) {
    return await this.personModel.findByPk(id, {
      include: [Address, Contact, User],
    });
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const person = await this.personModel.findByPk(id, {
        include: [Contact, Address, User],
      });

      //TODO: Make this code a new class

      const toSave = [];

      const dtoKeys = Object.keys(updatePersonDto);
      const associations = Object.keys(this.personModel.associations);

      dtoKeys.forEach((key) => {
        const hasAssociation = associations.includes(key);
        if (!hasAssociation) {
          return;
        }
        updatePersonDto[key].forEach(async (contact: IContact) => {
          if (contact.id) {
            const finded = person[key]?.find(({ id }) => contact.id === id);
            finded?.update(contact);
            return;
          }
          toSave.push(
            this[`${key}Model`]?.create({ ...contact, personId: person.id }),
          );
        });
      });

      person.update(updatePersonDto);

      await Promise.all(toSave);
      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw HttpResponse.unprocessableEntity('Erro ao atualizar usuário!');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
