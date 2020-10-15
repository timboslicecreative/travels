import Grid from "./Grid";
import {qPublishedPosts} from "lib/schema";
import {useQuery, NetworkStatus} from '@apollo/client';
import styles from "./PostsGrid.module.css";

const mapPostsToTiles = (posts) => posts.map(post => ({
    key: post.id,
    title: post.title,
    href: `/post/[slug]`,
    as: `/post/${post.slug}`,
    image: post.hero
}));

export default function PostsGrid(){
    const {loading, error, data, fetchMore, networkStatus} = useQuery(qPublishedPosts, {
            notifyOnNetworkStatusChange: true,
        }
    );
    const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

    const loadMorePosts = () => {
        fetchMore({
            variables: {
                skip: posts.length,
            },
        })
    }

    if (error) return "Error loading posts.";
    if (loading && !loadingMorePosts) return <div>Loading</div>;

    const { posts, count } = data;
    const areMorePosts = posts.length < count;

    return <Grid tiles={mapPostsToTiles(posts)} className={styles.grid} areMore={areMorePosts} loadMore={loadMorePosts}/>
}