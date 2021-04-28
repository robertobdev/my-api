import { Field, InputType, Int } from '@nestjs/graphql';
@InputType()
export class Pagination {
  @Field(() => Int, { defaultValue: 10 })
  limit?: number;

  @Field(() => Int)
  page: number;
}
