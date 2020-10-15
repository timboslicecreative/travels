import 'styles/global.css';
import {ApolloProvider} from '@apollo/client';
import {useApollo} from 'lib/apollo';
import Output from "lib/output";

const output = new Output('NextJS:APP', {timestamp: true});

export function reportWebVitals(metric) {
    output.log(metric)
}

export default function App({Component, pageProps}) {
    const apolloClient = useApollo(pageProps.initialApolloState);

    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}