// path: purchases/src/http/graphql/inputs/create-purchase-input.ts
/* Como iremos agora fazer uma mutions, como no exemplo, criar uma nova
purchase, iremos receber alguns valores vindo do usuário, então como
sempre, precisamos criar o input*/

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePurchaseInput {
  @Field()
  productId: string;

  /*Não iremos colocar aqui também o CustomerId, pois ele não é um dado que 
  iremos receber do frontend, iremos conseguir pegar ele aqui na aplicação
  pois o usuário já estará autenticado*/
}
