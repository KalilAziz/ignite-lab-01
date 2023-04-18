// path: Classroom/src/http/http.module.ts
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from 'src/database/database.module';
import { TestResolver } from 'src/http/test/test.resolver';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';

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
  providers: [TestResolver],
})
export class HttpModule {}
