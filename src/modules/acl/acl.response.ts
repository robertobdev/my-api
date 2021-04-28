import relayTypes from '../shared/interfaces/relay.types';
import { ObjectType } from '@nestjs/graphql';
import { Acl } from './entities/acl.entity';

@ObjectType()
export default class AclResponse extends relayTypes(Acl) {}
