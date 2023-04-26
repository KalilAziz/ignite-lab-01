import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject, createHttpLink, from } from '@apollo/client';
import { GetServerSidePropsContext, NextPage } from 'next';

export type ApolloClientContext = GetServerSidePropsContext

export const withApollo = (Component: NextPage) => {
  return function Provider(props: any) {
    return (
      <ApolloProvider client={getApolloClient(undefined, props.apolloState)}>
        <Component {...props} />
      </ApolloProvider>
    );
  };
};


export const getApolloClient = (
  ctx?: ApolloClientContext,
  initialState?: NormalizedCacheObject ) => {

  const httpLink = createHttpLink({
    uri: 'http://localhost:3332/graphql',
    fetch,
  })

  const cache = new InMemoryCache().restore(initialState ?? {});
  
  return new ApolloClient({
    link: from([httpLink]),
    cache
  });
}
