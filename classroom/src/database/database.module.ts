// path: purchases/src/database/database.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [PrismaService],
  /* Iremos colocar o export aqui, pois iremos utilizar o PrismaService em outros 
  módulos, como o AppModule*/
  exports: [PrismaService],
})
export class DatabaseModule {}

/* Agora, temos que criar um service para o prisma, que vai ser responsável por
fazer a conexão com o banco de dados. Para isso, vamos usar o seguinte comando:

  nest g service database/prisma --no-spec
*/
