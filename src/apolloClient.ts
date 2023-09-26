import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // your GraphQL Server URL
  cache: new InMemoryCache(),
});
