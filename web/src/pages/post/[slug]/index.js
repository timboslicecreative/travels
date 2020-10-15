import dynamic from "next/dynamic";
import {useRouter} from 'next/router'
import Link from "next/link";
import {initializeApollo} from "lib/apollo";
import {qPostSlugs, qPostBySlug} from "lib/schema";
import Picture from "components/Picture";
import Video from "components/Video";
import Grid from "components/Grid";
import Markdown from "components/Markdown";
import {MdChevronLeft, MdVideoLibrary, MdPhotoLibrary, MdPlace, Md3DRotation} from "react-icons/md";
import styles from "./Post.module.css";
import {useQuery} from "@apollo/client";

const ThreeSixtyPhoto = dynamic(
    () => import("components/ThreeSixtyPhoto"),
    {ssr: false}
);

const mapPhotosToTiles = (photos, slug) => photos.map(photo => ({
    key: photo.id,
    title: photo.caption,
    href: `/post/[slug]/photo/[id]`,
    as: `/post/${slug}/photo/${photo.id}`,
    image: photo
}));

const coverSources = [
    [420, {width: 420, height: 200}],
    [768, {width: 768, height: 250}],
    [1080, {width: 1080, height: 500}],
    [1280, {width: 1280, height: 500}],
];

export default function Post() {
    const router = useRouter();
    const {slug} = router.query;
    const {loading, error, data} = useQuery(qPostBySlug, {variables: {slug}});

    if (error) return "Error loading posts.";
    if (loading) return <div>Loading</div>;

    const {post} = data;

    const showContent = () => post && post.content && post.content !== "";
    const showPhotos = () => post && post.photos && post.photos.length > 0;
    const showVideos = () => post && post.videos && post.videos.length > 0;
    const showPhotos360 = () => post && post.photos360 && post.photos360.length > 0;
    const showLocation = () => post && post.locations && post.locations.length > 0;

    return (
        <article className={styles.post}>
            <div className={styles.backLink}>
                <Link href={`/`}><a><MdChevronLeft size={24}/>Back</a></Link>
            </div>
            <header id={"header"} className={styles.header}>
                <Picture image={post.hero} adjustments={{width: 1920, height: 500}} sources={coverSources}/>
                <h1>{post.title}</h1>
            </header>
            <section id={"introduction"} className={styles.introduction}>
                <p>{post.introduction}</p>
            </section>
            <nav id={"nav"} className={styles.navigation}>
                {showPhotos() && <a href={"#photos"}><MdPhotoLibrary/> Photos</a>}
                {showVideos() && <a href={"#videos"}><MdVideoLibrary/> Videos</a>}
                {showPhotos360() && <a href={"#threesixty"}><Md3DRotation/> 360</a>}
                {showLocation() && <a href={"#location"}><MdPlace/> Location</a>}
            </nav>
            {showContent() && <section id={"content"} className={styles.content}>
                <Markdown source={post.content}/>
            </section>}
            {showPhotos() && <section id={"photos"} className={styles.photos}>
                <h2><MdPhotoLibrary/>Photos</h2>
                <Grid tiles={mapPhotosToTiles(post.photos, post.slug)}/>
            </section>}
            {showVideos() && <section id={"videos"} className={styles.videos}>
                <h2><MdVideoLibrary/>Videos</h2>
                <Video videos={post.videos}/>
            </section>}
            {showPhotos360() && <section id={"threesixty"} className={styles.threesixty}>
                <h2><Md3DRotation/> 360 Views</h2>
                <ThreeSixtyPhoto photos={post.photos360}/>
            </section>}
            {showLocation() && <section id={"location"} className={styles.location}>
                <h2><MdPlace/>Location</h2>
            </section>}
        </article>
    )
};

export async function getStaticPaths() {
    const apolloClient = initializeApollo();
    const variables = {};
    const response = await apolloClient.query({query: qPostSlugs, variables});
    const paths = response.data.posts.map(post => ({
        params: {
            slug: post.slug
        }
    }));
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const apolloClient = initializeApollo();
    const variables = {slug: params.slug};
    await apolloClient.query({query: qPostBySlug, variables});
    return {
        props: {initialApolloState: apolloClient.cache.extract()},
        revalidate: 1,
    }
}