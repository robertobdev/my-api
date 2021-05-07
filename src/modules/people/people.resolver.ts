import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Person } from './entities/person.entity';
import { PeopleService } from './people.service';
import { GqlAuthGuard } from '../shared/guards/graphql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CrudList } from '../shared/interfaces/crud-list.interface';
import PersonResponse from './person.response';
import { CrudListInputs } from '../shared/interfaces/crud-list.input';
import { PaginationResolveGraphql } from '../shared/interfaces/pagination.interface';

@Resolver()
@UseGuards(GqlAuthGuard)
export class PeopleResolver {
  LIMIT_PER_PAGE = 10;
  constructor(private readonly peopleService: PeopleService) {}

  //TODO: make this class extendable
  @Query(() => PersonResponse)
  async people(
    @Args('crudList', { type: () => CrudListInputs })
    crudList: CrudList,
  ): Promise<PaginationResolveGraphql<Person>> {
    const {
      limit = this.LIMIT_PER_PAGE,
      page = 1,
      filter = '',
      field,
      order,
    } = crudList;
    const offset = (page - 1) * limit;
    console.log(field);
    const { count, rows: acls } = await this.peopleService.findAll(
      {
        limit,
        offset,
      },
      filter,
      { field, order },
    );
    const totalPage = Math.floor(count / limit);
    return {
      totalCount: count,
      nodes: acls,
      hasNextPage: totalPage > page,
    };
  }
  @Query(() => Person)
  async person(@Args('id', { type: () => Int }) id: number) {
    return this.peopleService.findOne(id);
  }
}
