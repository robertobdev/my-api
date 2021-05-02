import { OrderInputGraphql } from './order.enum';

export interface SortInputGraphql {
  field: string;
  order: OrderInputGraphql;
}
