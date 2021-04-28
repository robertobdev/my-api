import { Resolver, Query, Args, Int } from '@nestjs/graphql';

import { Pagination } from '../shared/interfaces/pagination.input';
import {
  PaginationInputGraphql,
  PaginationResolveGraphql,
} from '../shared/interfaces/pagination.interface';
import { GqlAuthGuard } from '../shared/guards/graphql-auth.guard';
import { UseGuards } from '@nestjs/common';

import AclResponse from './acl.response';
import { Acl } from './entities/acl.entity';
import { AclService } from './acl.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class AclResolver {
  LIMIT_PER_PAGE = 10;
  constructor(private readonly aclService: AclService) {}

  @Query(() => AclResponse)
  async acls(
    @Args('paginate', { type: () => Pagination })
    paginate: PaginationInputGraphql,
  ): Promise<PaginationResolveGraphql<Acl>> {
    const { limit = this.LIMIT_PER_PAGE, page } = paginate;
    const offset = (page - 1) * limit;
    const { count, rows: acls } = await this.aclService.findAll({
      limit,
      offset,
    });
    const totalPage = Math.floor(count / limit);
    return {
      totalCount: count,
      nodes: acls,
      hasNextPage: totalPage > page,
    };
  }

  @Query(() => Acl)
  async acl(@Args('id', { type: () => Int }) id: number) {
    return this.aclService.findOne(id);
  }
}
