// path: purchases/src/http/http.module.ts
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsResolver } from 'src/http/grapghql/resolvers/products.resolver';
import { ApolloFederationDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { ProductsService } from 'src/services/products/products.service';
import { PurchasesService } from 'src/services/purchases/purchases.service';
import { PurchasesResolver } from './grapghql/resolvers/purchases.resolver';
import { CustomersService } from 'src/services/customers/customers.service';
import { CustomersResolver } from './grapghql/resolvers/customers.resolver';
import { MessagingModule } from 'src/messaging/messaging.module';
import { Customer } from './grapghql/models/customers';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MessagingModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloFederationDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      buildSchemaOptions: {
        orphanedTypes: [Customer],
      },
      cors: {
        credentials: true,
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders:
          'Content-Type,Accept,Authorization,Access-Control-Allow-Origin',
      },
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
