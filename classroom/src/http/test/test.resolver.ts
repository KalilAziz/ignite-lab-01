// path: Classroom/src/http/test/test.resolver.ts

import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/authorization/authorization.guard';

// @Controller
@Resolver('test')
export class TestResolver {
  @Query(() => String)
  @UseGuards(AuthorizationGuard)
  hello() {
    return 'hello';
  }
}
