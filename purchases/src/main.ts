import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3333);
}
bootstrap();

/*Para instalar o graphQL no NestJS é bem simples, basta a gente seguri o quickStart
normalmente da documentação do NestJS, que é o seguinte:

npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql

Agora vamos em http.module.ts e vamos colocar algumas configurações para 
o NestJS
*/
