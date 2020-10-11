import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const GRAPHQL_URI = process.env.PUBLIC_GRAPHQL_API;
const link = new HttpLink({ uri: GRAPHQL_URI });
const cache = new InMemoryCache();
const client = new ApolloClient({
    link,
    cache,
    connectToDevTools: true
})

export default client;