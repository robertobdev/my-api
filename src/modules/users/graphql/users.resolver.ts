import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import PersonResponse from './users.response';
import { UsersService } from '../users.service';
import { GqlAuthGuard } from 'src/modules/shared/guards/graphql-auth.guard';
import { CrudListInputs } from 'src/modules/shared/interfaces/crud-list.input';
import { User } from '../entities/user.entity';
import { PaginationResolveGraphql } from 'src/modules/shared/interfaces/pagination.interface';
import { CrudList } from 'src/modules/shared/interfaces/crud-list.interface';

@Resolver()
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  LIMIT_PER_PAGE = 10;
  constructor(private readonly userService: UsersService) {}

  //TODO: make this class extendable
  @Query(() => PersonResponse)
  async users(
    @Args('crudList', { type: () => CrudListInputs })
    crudList: CrudList,
  ): Promise<PaginationResolveGraphql<User>> {
    const {
      limit = this.LIMIT_PER_PAGE,
      page = 1,
      filter = '',
      field,
      order,
    } = crudList;
    const offset = (page - 1) * limit;
    console.log(field);
    const { count, rows: acls } = await this.userService.findAll(
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
  @Query(() => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }
}
