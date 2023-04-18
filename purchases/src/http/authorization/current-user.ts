/* Como terá lugares que iremos precisar das informações do usuário, como por
exemplo o seu id para que possamos criar um Purchases, iremos criar nosso 
próprio decorator que irá fazer esse trabalho pela gente e retornar nosso
valor desejado */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface AuthUser {
  sub: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): AuthUser => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    return request.auth.payload;
  },
);
