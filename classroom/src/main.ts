// path: Classroom/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3334);
}
bootstrap();

/* Com toda a parte do Purchases finalizada, iremos agora começar a parte do Classroom. Para isso, iremos fazer alguns ajustes necessários para o funcionamento. Vamos começar, dentro de src/http,
iremos criar uma pasta chamado graphql, e dentro dela teremos uma pasta para os resolvers, e outra
para os models, depois, como fizemos algumas alterações na pasta authorization, iremos apagar ela
e copiar diretamente da pasta Purchases. Iremos apagar a pasta test com seu model, já que não
mais usaremos ela.*/
