import { ObjectType } from '@nestjs/graphql';
import relayTypes from '../../shared/interfaces/relay.types';
import { User } from '../entities/user.entity';

@ObjectType()
export default class UsersResponse extends relayTypes(User) {}
