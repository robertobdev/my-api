import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Person } from './entities/person.entity';
import { Address } from './entities/address.entity';
import { Contact } from './entities/contact.entity';
import { personProviders } from 'src/providers/person.providers';
import {
  CpfAlreadyExistConstraint,
  EmailAlreadyExistConstraint,
  LoginAlreadyExistConstraint,
} from 'src/helpers/validations';
import { Role } from './entities/role.entity';
import { RoleUser } from './entities/role-user.entity';
import { userProviders } from 'src/providers/user.providers';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Person,
      Address,
      Contact,
      Role,
      RoleUser,
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...personProviders,
    ...userProviders,
    CpfAlreadyExistConstraint,
    EmailAlreadyExistConstraint,
    LoginAlreadyExistConstraint,
  ],
  exports: [UsersService],
})
export class UsersModule {}
