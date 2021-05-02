import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { GqlAuthGuard } from '../shared/guards/graphql-auth.guard';
import { UseGuards } from '@nestjs/common';
import AclResponse from './acl.response';
import { Acl } from './entities/acl.entity';
import { AclService } from './acl.service';
import { CrudList } from '../shared/interfaces/crud-list.interface';
import { PaginationResolveGraphql } from '../shared/interfaces/pagination.interface';
import { CrudListInputs } from '../shared/interfaces/crud-list.input';

@Resolver()
@UseGuards(GqlAuthGuard)
export class AclResolver {
  LIMIT_PER_PAGE = 10;
  constructor(private readonly aclService: AclService) {}

  //TODO: make this class extendable
  @Query(() => AclResponse)
  async acls(
    @Args('crudList', { type: () => CrudListInputs })
    crudList: CrudList,
  ): Promise<PaginationResolveGraphql<Acl>> {
    const {
      limit = this.LIMIT_PER_PAGE,
      page = 1,
      filter = '',
      field,
      order,
    } = crudList;
    const offset = (page - 1) * limit;
    console.log(field);
    const { count, rows: acls } = await this.aclService.findAll(
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

  @Query(() => Acl)
  async acl(@Args('id', { type: () => Int }) id: number) {
    return this.aclService.findOne(id);
  }
}
