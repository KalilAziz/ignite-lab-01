// path: purchases/src/http/http.module.ts
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsResolver } from 'src/http/grapghql/resolvers/products.resolver';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { ProductsService } from 'src/services/products/products.service';
import { PurchasesService } from 'src/services/purchases/purchases.service';
import { PurchasesResolver } from './grapghql/resolvers/purchases.resolver';
import { CustomersService } from 'src/services/customers/customers.service';
import { CustomersResolver } from './grapghql/resolvers/customers.resolver';

@Module({
  imports: [
    // variáveis de ambiente
    ConfigModule.forRoot(),
    DatabaseModule,
    // Iremos importar o GraphQLModule
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // Criar o schema.gql dentro da pasta src
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
  providers: [
    // Products
    ProductsResolver,
    ProductsService,

    // Purchases
    PurchasesResolver,
    PurchasesService,

    // Custumer
    CustomersService,
    // Adicionar o customer resolver
    CustomersResolver,
  ],
})
export class HttpModule {}
