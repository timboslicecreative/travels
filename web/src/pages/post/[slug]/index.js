import dynamic from "next/dynamic";
import Picture from "components/Picture";
import Video from "components/Video";
import Grid from "components/Grid";
import Markdown from "components/Markdown";
import {MdChevronLeft, MdVideoLibrary, MdPhotoLibrary, MdPlace, Md3DRotation} from "react-icons/md";
import {fetchAPI} from "lib/api";
import Link from "next/link";
import styles from "../Post.module.css";

const ThreeSixtyPhoto = dynamic(
    () => import("../../../components/ThreeSixtyPhoto"),
    {ssr: false}
);

const mapPhotosToTiles = (photos, slug) => photos.map(photo => ({
    key: photo.id,
    title: photo.caption,
    href: `/post/[slug]/photo/[id]`,
    as: `/post/${slug}/photo/${photo._id}`,
    image: photo
}));

const coverSources = [
    [420, {width: 420, height: 200}],
    [768, {width: 768, height: 250}],
    [1080, {width: 1080, height: 500}],
    [1280, {width: 1280, height: 500}],
];

export default function Post({post}) {
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
    const query = `{
        posts {
            slug, 
        }
    }`;
    const variables = {};
    const data = (await fetchAPI(query, {variables, ssr: true})) || [];
    const paths = data.posts.map(post => ({params: {slug: post.slug}}));
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
            videos { _id, url, poster { hash, width, height, ext } }
            photos360 {  _id, hash, ext, width, height, mime }
            videos_360 {  _id, hash, ext, url }
        }}`;
    const variables = {
        slug: params.slug
    };
    const data = (await fetchAPI(query, {variables, ssr: true})) || [];
    return {
        props: {post: data.postBySlug},
    }
}

// export default withApollo(Post);
