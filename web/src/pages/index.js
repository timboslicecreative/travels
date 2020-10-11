import Head from 'next/head'
import {fetchAPI} from "lib/api"
import Grid, {Tile, orderTiles} from "components/Grid"
import styles from "./Index.module.css"

const mapPostsToTiles = (posts) => posts.map(post => ({
    key: post.id,
    title: post.title,
    href: `/post/[slug]`,
    as: `/post/${post.slug}`,
    image: post.hero
}));

export default function Index({posts}) {
    // const {loading, error, data} = useQuery(QUERY);
    // if (loading) return (<p>Loading</p>);
    // if (error) return (<p>{error}</p>);
    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <Grid tiles={mapPostsToTiles(posts)} className={styles.grid}/>
            </main>

            <footer>

            </footer>

        </div>
    )
};

export async function getStaticProps({}) {
    const query = `query PublishedPosts($where: JSON, $sort: String) {
        posts(where: $where, sort: $sort) {
            id, title, slug, 
            hero { ext, width, height, hash, url, mime }
        }
    }`;
    const variables = {
        where: { status: 'published' },
        sort: "date:desc"
    };
    const data = (await fetchAPI(query, {variables, ssr: true})) || [];
    return {
        props: {posts: data.posts},
    }
}

// export default withApollo(Home);
