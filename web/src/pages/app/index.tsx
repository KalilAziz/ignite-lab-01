// path: web/src/pages/app/index.tsx
import { Product, useMeQuery } from '@/graphql/generated/graphql';
import { getServerPageGetProducts } from '@/graphql/generated/page';
import { ssrGetProducts } from '@/graphql/generated/page';
import { withApollo } from '@/lib/withApollo';
import {  withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";

type HomeProps = {
  data: {
    products: Product[]
  }
}

export const Home = ({data}: HomeProps) => {
  const { user } = useUser();
  const {data: profile} = useMeQuery()

  console.log(profile)


  return (
    <div>
      <pre>
        {JSON.stringify(data.products, null, 2)}
      </pre>
      {/* <h1>Pagina app - {user?.name}</h1>
      <h4>Profile (server rendered)</h4> */}
      {/* <a href="/api/auth/logout">Logout</a> */}
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    return await getServerPageGetProducts({}, ctx)
  }
})


export default withApollo(
  ssrGetProducts.withPage()(Home)
)