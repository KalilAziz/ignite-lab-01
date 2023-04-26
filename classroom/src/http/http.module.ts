// path: Classroom/src/http/http.module.ts
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from 'src/database/database.module';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { StudentsResolver } from './graphql/resolvers/students.resolver';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { EnrollmentService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';
import { CoursesService } from 'src/services/courses.service';

@Module({
  imports: [
    // variáveis de ambiente
    ConfigModule.forRoot(),
    DatabaseModule,
    // Iremos importar o GraphQLModule
    GraphQLModule.forRoot({
      // Criar o schema.gql dentro da pasta src
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloFederationDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
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
    EnrollmentsResolver,
    EnrollmentService,

    StudentsResolver,
    StudentsService,

    CoursesResolver,
    CoursesService,
  ],
})
export class HttpModule {}
