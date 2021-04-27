import relayTypes from '../shared/interfaces/relay.types';
import { ObjectType } from '@nestjs/graphql';
import { Person } from './entities/person.entity';

@ObjectType()
export default class PersonResponse extends relayTypes(Person) {}
