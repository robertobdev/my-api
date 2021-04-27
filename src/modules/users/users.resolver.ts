import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Person } from './entities/person.entity';
import { UsersService } from './users.service';
import { Pagination } from '../shared/interfaces/pagination.input';
import {
  PaginationInputGraphql,
  PaginationResolveGraphql,
} from './../shared/interfaces/pagination.interface';
import PersonResponse from './person.response';

@Resolver()
export class UsersResolver {
  LIMIT_PER_PAGE = 10;
  constructor(private readonly userservice: UsersService) {}

  @Query(() => PersonResponse)
  async people(
    @Args('paginate', { type: () => Pagination })
    paginate: PaginationInputGraphql,
  ): Promise<PaginationResolveGraphql<Person>> {
    const { limit = this.LIMIT_PER_PAGE, page } = paginate;
    const offset = (page - 1) * limit;
    const { count, rows: people } = await this.userservice.findAll({
      limit,
      offset,
    });
    const totalPage = Math.floor(count / limit);
    return {
      totalCount: count,
      nodes: people,
      hasNextPage: totalPage > page,
    };
  }

  @Query(() => Person)
  async person(@Args('id', { type: () => Int }) id: number) {
    return this.userservice.findOne(id);
  }
}
