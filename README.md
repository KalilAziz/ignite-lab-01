# ignite Lab 01

- NestJS
- GraphQL
- Apache Kafka
- NextJS
- Apollo Client (GraphQL)

## Funcionalodades

### Serviços de comprar (purchases)

- [ADMIN] Cadastro de produtos
- [ADMIN] Listagem de produtos

- [Auth] Listagem de compra

- [Public] Compra de um produto
- [Public] Listagem de produtos disponíveis p/ compra

### Serviço de sala de aula (classroom)

- [ADMIN] Listar matrículas
- [ADMIN] Listar alunos
- [ADMIN] Listar cursos
- [ADMIN] Cadastrar cursos

- [Auth] Listar cursos que tenho acesso
- [Auth] Acessar conteúdo do curso

Para começar, dentro de purchases, iremos deletar nosso controller e nosso
service também, pois não iremos mais utilizar e iremos retirar suas import
ações do módulo.

Agora iremos usar a cli entro de purchases para nos ajudar a criar novas
estruturas.

A primeira coisa que vamos gerar será um módulo só para bancos de dados,
pois iremos utilizar para tentar desacomplar o máximo possível do nosso
projeto.

nest generate module database

Vamos criar um módulo também para http, pois iremos utilizar para colocar
tudo sobre rotas dentro dele

nest generate module http

Agora, por enquanto, vamos trabalhar com um autenticação dentro de http,
pois iremos utilizar para colocar tudo sobre rotas dentro dele.

Para começar, iremos criar um arquivo .env e acidionar ele também
dentro do .gitignore

Para que o nestjs consiga ler o arquivo .env, precisamos instalar o
@nestjs/config com o seguinte comando:

npm i @nestjs/config

E agora vamos começar a trabalhar em nosso arquivo http.module.ts que
foi gerado para a gente
