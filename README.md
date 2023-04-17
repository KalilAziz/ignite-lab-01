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

Agora que terminamos de configurar nosso ambiente de purchases, iremos fazer a
configuração do ambiente de classroom. Para isso, vamos apagar o Classroom, pois
iremos fazer um comando para duplicar o purchases:

rm -rf classroom
cp -r purchases/ classroom
cd classroom
rm -rf node_modules
rm -rf dist
npm install

Agora vamos alterar o nome do package.json para classroom

no arquivo .env, vamos alterar o nome do banco de dados para
DATABASE_URL="postgresql://docker:docker@localhost:5432/classroom-ignite?schema=public"

Na pasta prisma, iremos deletar a pasta migrations

E dentro de schema.prisma, criar um novo model só para testes:

model Student {
id String @id @default(uuid())
}

e vamos rodar o comando:
npx prisma migrate dev

Para finalizar, vamos no arquivo main e alterar o endereço para 3334
