// path: purchases/src/http/http.module.ts
import { Module } from '@nestjs/common';

// Temos que importar para que possamos trabalhar com as variáveis de ambiente
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
  // Remove de controller e adiciona em providers
  // controllers: [TextController],
  providers: [TestResolver],
})
export class HttpModule {}

/* Agora para testar, vamos em src/http/test/test.controller.ts e renomear o arquivo, em vez de
.controler.ts será .resolver.ts
 */
