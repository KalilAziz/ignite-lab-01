// path: purchases/src/http/test/test.resolver.ts
// import { PrismaService } from 'src/database/prisma/prisma.service';
// constructor(private prisma: PrismaService) {}
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/authorization/authorization.guard';

// @Controller
@Resolver('test')
export class TestResolver {
  // @Get()
  // Dentro da query, temos que colocar a tipagem
  @Query(() => String)
  @UseGuards(AuthorizationGuard)
  hello() {
    return 'hello';
  }
}
