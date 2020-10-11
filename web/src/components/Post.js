import styles from "./Post.module.css";
import withApollo from "../lib/withApollo";
import {thumborUrl} from "../lib/thumbor";
import Picture from "./Picture"
import Thumbnail from "./Thumbnail"
import {MdArrowForward, MdArrowBack} from "react-icons/md";

const backgroundAdjustments = {
    width: 1,
    filters: {
        // blur: [50, 50],
        saturation: [0.5],
        brightness: [-20],
    }
};

const thumbnailPreloaderAdjustments = {
    width: 1,
    filters: {
        blur: [150, 50],
        saturation: [0.3],
    }
};
const thumbnailAdjustments = {
    height: 100,
};

const coverPreloaderAdjustments = {
    width: 1,
    filters: {
        blur: [150, 50],
        saturation: [0.3],
    }
};

const coverLandscape = {
    width: 1920,
    height: 1280
};

const coverPortrait = {
    width: 1280,
    height: 1920
};
const isLandscape = (image) => image.width > image.height;
const orientation = (image) => isLandscape(image) ? styles.photoLandscape : styles.photoPortrait;
const coverAdjustments = (image) => isLandscape(image) ? coverLandscape : coverPortrait;

const Post = ({post}) => {
    const backgroundStyle = {
        backgroundImage: `url('${thumborUrl(post.hero, backgroundAdjustments)}')`
    };
    return (
        <div className={styles.post}>
            <span className={styles.background} style={backgroundStyle}/>
            <div className={styles.postInner}>\
                <Picture image={post.hero} adjustments={coverAdjustments(post.hero)}
                         className={`${styles.photo} ${orientation(post.hero)}`}/> :
                <Picture image={post.hero} adjustments={coverPreloaderAdjustments}
                         className={`${styles.photo} ${orientation(post.hero)}`}/>
                <div className={styles.navBar}>
                    <MdArrowForward className={styles.icon}/>
                    <span className={styles.background} style={backgroundStyle}/>
                    <div className={styles.info}>
                        <h2 className={styles.infoTitle}>{post.title}</h2>
                        <p className={styles.infoDate}>{post.date}</p>
                    </div>
                    <nav className={styles.thumbnails}>
                        {post.photos.map(photo => <Thumbnail image={photo}
                                                              className={orientation(photo)}
                                                              adjustments={thumbnailAdjustments}
                                                              key={photo.id}/>)}
                    </nav>
                </div>
            </div>
        </div>
    )
};

export default withApollo(Post);


