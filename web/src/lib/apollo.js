import {useMemo} from 'react';
import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';
import {concatPagination} from '@apollo/client/utilities'

let apolloClient;

const isSS = typeof window === 'undefined';
const link = new HttpLink({uri: isSS ? process.env.GRAPHQL_API : process.env.PUBLIC_GRAPHQL_API});
const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                posts: concatPagination(),
            },
        },
    },
});

function createApolloClient() {
    return new ApolloClient({
        ssrMode: isSS,
        link,
        cache,
        connectToDevTools: true, // process.env.NODE_ENV === 'development'
    })
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();
        // Restore the cache using the data passed from getStaticProps/getServerSideProps
        // combined with the existing cached data
        _apolloClient.cache.restore({...existingCache, ...initialState});
    }
    // For SSG and SSR always create a new Apollo Client
    if (isSS) return _apolloClient
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient
    return _apolloClient
}

export function useApollo(initialState) {
    return useMemo(() => initializeApollo(initialState), [initialState]);
}