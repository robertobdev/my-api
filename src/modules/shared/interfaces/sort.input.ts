import { Field, InputType } from '@nestjs/graphql';
import { OrderInputGraphql } from './order.enum';

@InputType()
export class Sort {
  @Field({ defaultValue: 'id' })
  field: string;

  @Field({ defaultValue: 'ASC' })
  order: OrderInputGraphql;
}
