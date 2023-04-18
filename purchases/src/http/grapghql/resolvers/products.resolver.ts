// path: purchases/src/http/graphql/resolvers/producst.resolver.ts

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from '../models/product';
import { ProductsService } from 'src/services/products/products.service';
import { CreateProductInput } from '../inputs/create-product-input';
import { AuthorizationGuard } from 'src/http/authorization/authorization.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class ProductsResolver {
  constructor(private productService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productService.findAll();
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Product)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productService.createProduct(data);
  }
}
