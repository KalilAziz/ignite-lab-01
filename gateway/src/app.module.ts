import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // eslint-disable-next-line
        // @ts-ignore
        cors: true,
        context: ({ req }) => {
          return { headers: req.headers };
        },
      },

      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'purchases', url: 'http://localhost:3333/graphql' },
            { name: 'classroom', url: 'http://localhost:3334/graphql' },
          ],
        }),
        buildService: ({ url }) => {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest: ({ request, context }) => {
              request.http.headers.set(
                'authorization',
                context?.['headers']?.['authorization'],
              );
            },
          });
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
