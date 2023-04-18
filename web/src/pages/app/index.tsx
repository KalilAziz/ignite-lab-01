// path: web/src/pages/app/index.tsx
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import { GetServerSideProps } from "next";

/* Mas iremos fazer algo difetente aqui, iremos mandar para o usuário direto para a página de login, caso ele não esteja logado
 */

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      <h1>Pagina app - {user?.name}</h1>
      <h4>Profile (server rendered)</h4>
      <a href="/api/auth/logout">Logout</a>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context)  => {
  // pegar o token do usuário
  const user = await getSession(context.req, context.res);

  console.log(user)

  // se o usuário não estiver logado, redirecionar para a página de logi
  if (!user) {
    return {
      redirect: {
        destination: "/api/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
