// path: purchases/src/http/authorization/authorization.guard.ts

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { auth } from 'express-oauth2-jwt-bearer';
import { promisify } from 'node:util';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_DOMAIN: string;
  private AUTH0_AUDIENCE: string;

  constructor(private configService: ConfigService) {
    this.AUTH0_AUDIENCE = this.configService.get('AUTH0_AUDIENCE') ?? '';
    this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN') ?? '';
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req, res } = GqlExecutionContext.create(context).getContext();

    const checkJwt = auth({
      audience: this.AUTH0_AUDIENCE,
      issuerBaseURL: this.AUTH0_DOMAIN,
      tokenSigningAlg: 'RS256',
    });

    try {
      await promisify(checkJwt)(req, res);

      return true;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
