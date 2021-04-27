import { Module } from '@nestjs/common';
import { AclService } from './acl.service';
import { AclController } from './acl.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Acl } from './entities/acl.entity';
import { Modules } from './entities/module.entity';

@Module({
  imports: [SequelizeModule.forFeature([Acl, Modules])],
  controllers: [AclController],
  providers: [AclService],
})
export class AclModule {}
