import Link from "next/link";
import Picture, {imageOrientation} from "components/Picture";
import {initializeApollo} from "lib/apollo";
import {useRouter} from "next/router";
import {useQuery} from "@apollo/client";
import {qPostBySlug, qPostsPhotos} from "lib/schema";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";
import styles from "./Photo.module.css";

const copyright = "© Copyright 2020 - Timbo Slice - All rights reserved.";

const orientationAdjustments = [
    {height: 480, width: 320}, // 0-Portrait
    {height: 640, width: 960}, // 1-Landscape
    {width: 1920}, // 2-Panorama
];

const orientationStyles = [
    styles.portrait, // 0-Portrait
    styles.landscape, // 1-Landscape
    styles.panorama, // 2-Panorama
];

const orientationStyle = (image) => orientationStyles[imageOrientation(image)];
const orientationAdjustment = (image) => orientationAdjustments[imageOrientation(image)];

export default function PostPhoto() {

    const router = useRouter();
    const {slug, id} = router.query;
    const {loading, error, data} = useQuery(qPostBySlug, {variables: {slug}});

    if (error) return "Error loading posts.";
    if (loading) return <div>Loading</div>;

    const {post} = data;

    const lastIndex = post.photos.length - 1;
    const index = post.photos.findIndex(photo => photo.id === id);
    const prevIndex = (index - 1) < 0 ? lastIndex : index - 1;
    const nextIndex = (index + 1) > lastIndex ? 0 : index + 1;

    const photo = post.photos[index];
    const prev = post.photos[prevIndex];
    const next = post.photos[nextIndex];

    return (
        <div className={styles.photo}>
            <div className={`${styles.photoInner} ${orientationStyle(photo)}`}>
                <div className={styles.backLink}>
                    <Link href={`/post/[slug]`} as={`/post/${slug}`}>
                        <a><MdChevronLeft size={24} color={"#fff"}/>Back</a>
                    </Link>
                </div>
                <Picture className={styles.picture} image={photo} adjustments={orientationAdjustment(photo)}/>
                <p className={styles.caption}>
                    {photo.caption} {copyright}</p>
            </div>
            <nav className={styles.navigation}>
                <Link href={`/post/[slug]/photo/[id]`} as={`/post/${slug}/photo/${prev.id}`}>
                    <a><MdChevronLeft size={24} color={"#fff"}/></a>
                </Link>
                <Link href={`/post/[slug]/photo/[id]`} as={`/post/${slug}/photo/${next.id}`}>
                    <a><MdChevronRight size={24} color={"#fff"}/></a>
                </Link>
            </nav>
        </div>
    )
};

export async function getStaticPaths() {
    const apolloClient = initializeApollo();
    const variables = {};
    const response = await apolloClient.query({query: qPostsPhotos, variables});
    let paths = response.data.posts.map(post =>
        post.photos.map(photo => ({params: {slug: post.slug, id: photo.id}}))
    ).flat();

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
