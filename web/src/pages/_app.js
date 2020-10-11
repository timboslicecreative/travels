import 'styles/global.css';
import client from 'lib/apollo';
import {ApolloProvider} from '@apollo/client';

export default function App({Component, pageProps}) {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}