import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleUser } from './entities/role-user.entity';
import { Role } from '../acl/entities/role.entity';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './graphql/users.resolver';
import { userProviders } from 'src/providers/user.providers';
import {
  CpfAlreadyExistConstraint,
  EmailAlreadyExistConstraint,
  LoginAlreadyExistConstraint,
} from 'src/helpers/validations';
import { Address } from './entities/address.entity';
import { Contact } from './entities/contact.entity';
import { UserController } from './users.controller';

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
