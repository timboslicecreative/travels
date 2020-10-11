import {fetchAPI} from "../../../../lib/api";
import Link from "next/link";
import Picture, {imageOrientation} from "../../../../components/Picture";
import styles from "./Photo.module.css";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";

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


export default function PostPhoto({post, photo, prev, next}) {
    const slug = post.slug;
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
                <Link href={`/post/[slug]/photo/[id]`} as={`/post/${slug}/photo/${prev._id}`}>
                    <a><MdChevronLeft size={24} color={"#fff"}/></a>
                </Link>
                <Link href={`/post/[slug]/photo/[id]`} as={`/post/${slug}/photo/${next._id}`}>
                    <a><MdChevronRight size={24} color={"#fff"}/></a>
                </Link>
            </nav>
        </div>
    )
};


export async function getStaticPaths() {
    const query = `{
        posts {
            slug,
            photos { _id }
        }
    }`;
    const variables = {};
    const data = (await fetchAPI(query, {variables, ssr: true})) || [];
    let paths = data.posts.map(post =>
        post.photos.map(photo => ({params: {slug: post.slug, id: photo._id}}))
    ).flat();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const query = `query postBySlug($slug: String!){
        postBySlug(slug: $slug) {
            slug, title, introduction, content,             
            hero { hash, ext, width, height}
            photos { _id, hash, ext, width, height, caption, mime }
        }}`;
    const variables = {
        slug: params.slug
    };
    const data = (await fetchAPI(query, {variables, ssr: true})) || [];
    const post = data.postBySlug;
    const lastIndex = post.photos.length - 1;
    const index = post.photos.findIndex(photo => photo._id === params.id);
    const prevIndex = (index - 1) < 0 ? lastIndex : index - 1;
    const nextIndex = (index + 1) > lastIndex ? 0 : index + 1;
    return {
        props: {
            post: post,
            photo: post.photos[index],
            prev: post.photos[prevIndex],
            next: post.photos[nextIndex]
        },
    }
}