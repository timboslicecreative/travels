import {gql} from "@apollo/client";

export const qPostSlugs = gql`
    query postSlugs {
        posts {
            slug,
        }
    }
`;

export const qPublishedPosts = gql`
    query publishedPosts {
        posts(sort: "date", start:0, limit: 20) {
            id, title, slug,
            hero { ext, width, height, hash, url, mime }
        }
        count:postsCount
    }
`;

export const qPostBySlug = gql`
    query postBySlug($slug: String!){
        post:postBySlug(slug: $slug) {
            slug, title, introduction, content,
            hero { hash, ext, width, height, url }
            photos { id, url, hash, ext, width, height, caption, mime }
            videos { id, url, hash, ext }
            videosExternal { id, url, poster { hash, width, height, ext, url } }
            photos360 {  id, url, hash, ext, width, height, mime }
            videos360 {  id, url, hash, ext }
        }
    }
`;

export const qPostsPhotos = gql`
    query {
        posts {
            slug,
            photos { id }
        }
    }
`;