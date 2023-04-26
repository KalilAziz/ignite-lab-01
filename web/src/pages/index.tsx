// path: web/src/pages/index.tsx
import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";

/* Mas iremos fazer algo difetente aqui, iremos mandar para o usuário direto para a página de login, caso ele não esteja logado e caso ele esteja logado, iremos mandar para a página de app
 */



export default function Home() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  /* O método getSession irá verificar se o usuário está logado, caso não esteja, ele irá redirecionar
  para a página de login*/
  const session = await getSession(req, res);

  // Caso o usuário não esteja logado, iremos redirecionar para a página de login
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/login",
        permanent: false,
      },
    };
    // Caso o usuário esteja logado, iremos redirecionar para a página de app
  } else {
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }
};
