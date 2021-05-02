import { PaginationInputGraphql } from './pagination.interface';
import { SortInputGraphql } from './sort.interface';

export interface CrudList extends PaginationInputGraphql, SortInputGraphql {
  filter: string;
}
