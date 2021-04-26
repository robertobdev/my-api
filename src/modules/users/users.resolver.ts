import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Person } from './entities/person.entity';
import { UsersService } from './users.service';

@Resolver((of) => Person)
export class UsersResolver {
  constructor(private readonly userservice: UsersService) {}

  @Query(() => [Person])
  async people(): Promise<any> {
    return this.userservice.findAll();
  }

  @Query(() => Person)
  async person(@Args('id', { type: () => Int }) id: number) {
    return this.userservice.findOne(id);
  }
}
