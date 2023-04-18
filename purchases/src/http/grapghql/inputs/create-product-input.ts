// path: purchases/src/http/graphql/inputs/create-product-input.ts

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  title: string;
}
