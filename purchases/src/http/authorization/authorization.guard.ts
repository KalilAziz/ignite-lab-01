// path: purchases/src/http/authorization/authorization.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
// import { Observable } from 'rxjs'; iremos remover o Observable pois
//não iremos mais trabalhar com ele

/*Esse guard será responsável por verificar se o usuário está autenticado,
muito parecido com os middlewares que usávamos no fastify ou express*/

/*Como iremos usar o quickStart do auth0, iremos ter que instalar alguns pacotes
para que possa funcionar corretamente, para isso, iremos instalar os pacores:

   npm i express-jwt jwks-rsa - deprecated
   npm i express-oauth2-jwt-bearer

*/

// import jwt from 'express-jwt';
// import { expressJwtSecret } from 'jwks-rsa';
import { auth } from 'express-oauth2-jwt-bearer';

// Vamos usar essa função para transformar uma função de callback em uma função
// que retorna uma promise
import { promisify } from 'node:util';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_DOMAIN: string;
  private AUTH0_AUDIENCE: string;

  // Vamos começar criando um constructor
  constructor(private configService: ConfigService) {
    // Vamos pegar as variáveis de ambiente
    this.AUTH0_AUDIENCE = this.configService.get('AUTH0_AUDIENCE') ?? '';
    this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN') ?? '';
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Precisamos mudar por estar usando graphql

    // const http = context.switchToHttp();
    // // Vamos pegar a request
    // const req = http.getRequest();
    // // Vamos pegar o response
    // const res = http.getResponse();

    const { req, res } = GqlExecutionContext.create(context).getContext();

    const checkJwt = auth({
      audience: this.AUTH0_AUDIENCE,
      issuerBaseURL: this.AUTH0_DOMAIN,
      tokenSigningAlg: 'RS256',
    });

    try {
      // Vamos usar a função promisify para transformar uma função de callback
      // em uma função que retorna uma promise
      await promisify(checkJwt)(req, res);

      return true;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
