import Head from 'next/head';
import PostsGrid from "components/PostsGrid";
import {qPublishedPosts} from "lib/schema";
import {initializeApollo} from 'lib/apollo';
import styles from "./Index.module.css";
import Output from "lib/output";
const output = new Output('Pages:Index', {timestamp: true, icon: '🕸️'});

export default function Index() {
    return (
        <div className="container">
            <Head>
                <title>TimboSlice Travels</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <PostsGrid />
            </main>
            <footer>
            </footer>
        </div>
    )
};

export async function getStaticProps({}) {
    const apolloClient = initializeApollo();
    const variables = {start: 0, limit: 20};
    await apolloClient.query({query: qPublishedPosts, variables});
    return {
        props: {initialApolloState: apolloClient.cache.extract()},
        revalidate: 1,
    }
}
