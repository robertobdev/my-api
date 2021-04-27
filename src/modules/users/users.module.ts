import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from '../people/entities/address.entity';
import { Contact } from '../people/entities/contact.entity';
import { Person } from '../people/entities/person.entity';
import { RoleUser } from './entities/role-user.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

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
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
