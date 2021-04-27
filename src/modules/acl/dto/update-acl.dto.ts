import { PartialType } from '@nestjs/swagger';
import { CreateAclDto } from './create-acl.dto';

export class UpdateAclDto extends PartialType(CreateAclDto) {}
