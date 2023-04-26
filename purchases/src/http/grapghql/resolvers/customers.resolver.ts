// path: purchases/src/http/graphql/resolvers/customer.resolver.ts

import {
  Parent,
  Query,
  ResolveField,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/authorization/authorization.guard';
import { UseGuards } from '@nestjs/common';
import { CustomersService } from 'src/services/customers/customers.service';
import { Customer } from '../models/customers';
import { AuthUser, CurrentUser } from 'src/http/authorization/current-user';
import { Purchase } from '../models/purchases';
import { PurchasesService } from 'src/services/purchases/purchases.service';

// Colocar explicitamente o retorno do Resolver pai
@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customerService: CustomersService,
    private purchaseService: PurchasesService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    return this.customerService.getCustumerById(user.sub);
  }

  // Declarar explicitamente o retorno do Resolver filho
  @ResolveField(() => [Purchase])
  purchases(@Parent() customer: Customer) {
    return this.purchaseService.findByCustomerId(customer.id);
  }

  @ResolveReference()
  resolveReference(reference: { authUserId: string }) {
    return this.customerService.getCustumerById(reference.authUserId);
  }
}
