import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  async create(@Body() createUserDto: CreateUserDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const person = await this.personModel.create(createUserDto, {
        include: [Address, Contact, User],
        transaction,
      });
      // person.user.addRole()
      await transaction.commit();
      return person;
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      return 'This action adds a new user';
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
