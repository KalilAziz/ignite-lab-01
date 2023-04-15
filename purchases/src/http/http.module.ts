import { Module } from '@nestjs/common';

// Temos que importar para que possamos trabalhar com as variáveis de ambiente
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // Importamos o módulo de configuração
    ConfigModule.forRoot(),
    /*Já é o suficiente para que o module consiga ler as variáveis de ambiente
    de forma automática e possamos trabalhar com elas em nossos arquivos que 
    estejam dentro de http e que use o http.module.ts*/
  ],
})
export class HttpModule {}
