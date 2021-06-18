import { Module } from '@nestjs/common';
import { AclService } from './acl.service';
import { AclController } from './acl.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Acl } from './entities/acl.entity';
import { Modules } from './entities/module.entity';
import { AclResolver } from './acl.resolver';
import { Role } from './entities/role.entity';

@Module({
  imports: [SequelizeModule.forFeature([Acl, Modules, Role])],
  controllers: [AclController],
  providers: [AclService, AclResolver],
})
export class AclModule {}
