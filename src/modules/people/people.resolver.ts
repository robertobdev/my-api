import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Person } from './entities/person.entity';
import { PeopleService } from './people.service';
import { GqlAuthGuard } from '../shared/guards/graphql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
@UseGuards(GqlAuthGuard)
export class PeopleResolver {
  LIMIT_PER_PAGE = 10;
  constructor(private readonly peoplService: PeopleService) {}

  // @Query(() => PersonResponse)
  // async people(
  //   @Args('paginate', { type: () => Pagination })
  //   paginate: PaginationInputGraphql,
  // ): Promise<PaginationResolveGraphql<Person>> {
  //   const { limit = this.LIMIT_PER_PAGE, page } = paginate;
  //   const offset = (page - 1) * limit;
  //   const { count, rows: people } = await this.peoplService.findAll({
  //     limit,
  //     offset,
  //   });
  //   const totalPage = Math.floor(count / limit);
  //   return {
  //     totalCount: count,
  //     nodes: people,
  //     hasNextPage: totalPage > page,
  //   };
  // }

  @Query(() => Person)
  async person(@Args('id', { type: () => Int }) id: number) {
    return this.peoplService.findOne(id);
  }
}
