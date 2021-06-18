import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleUser } from './entities/role-user.entity';
import { Role } from '../acl/entities/role.entity';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './graphql/users.resolver';

import { Address } from './entities/address.entity';
import { Contact } from './entities/contact.entity';
import { UserController } from './users.controller';
import {
  CpfAlreadyExistConstraint,
  EmailAlreadyExistConstraint,
  LoginAlreadyExistConstraint,
} from '../../helpers/validations';
import { userProviders } from '../../providers/user.providers';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Address, Contact, Role, RoleUser]),
  ],
  controllers: [UserController],
  providers: [
    UsersService,
    CpfAlreadyExistConstraint,
    EmailAlreadyExistConstraint,
    LoginAlreadyExistConstraint,
    UsersResolver,
    ...userProviders,
  ],
  exports: [UsersService],
})
export class UsersModule {}
