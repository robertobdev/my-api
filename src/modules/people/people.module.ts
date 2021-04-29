import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { Person } from './entities/person.entity';
import { Address } from './entities/address.entity';
import { Contact } from './entities/contact.entity';
import { personProviders } from '../../providers/person.providers';
import {
  CpfAlreadyExistConstraint,
  EmailAlreadyExistConstraint,
  LoginAlreadyExistConstraint,
} from '../../helpers/validations';
import { Role } from '../acl/entities/role.entity';
import { RoleUser } from '../users/entities/role-user.entity';
import { userProviders } from '../../providers/user.providers';
import { PeopleResolver } from './people.resolver';

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
  controllers: [PeopleController],
  providers: [
    PeopleService,
    CpfAlreadyExistConstraint,
    EmailAlreadyExistConstraint,
    LoginAlreadyExistConstraint,
    PeopleResolver,
    ...personProviders,
    ...userProviders,
  ],
  exports: [PeopleService],
})
export class PeopleModule {}
