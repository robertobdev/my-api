import { Field, InputType, Int } from '@nestjs/graphql';
import { OrderInputGraphql } from './order.enum';
@InputType()
export class CrudListInputs {
  @Field(() => Int, { defaultValue: 10 })
  limit?: number;

  @Field(() => Int, { defaultValue: 1 })
  page: number;

  @Field({ defaultValue: 'id' })
  field: string;

  @Field({ defaultValue: 'ASC' })
  order: OrderInputGraphql;

  @Field({ defaultValue: '' })
  filter: string;
}
