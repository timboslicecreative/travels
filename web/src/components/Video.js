import ReactPlayer from 'react-player/vimeo'
import {thurl} from "lib/thumbor";
import styles from './Video.module.css';

const config = {
    playerOptions: {
        loop: true,
        controls: true,
        muted: true,
        playing: true,
    },
};

const playerProps = {
    width: '100%',
    height: '100%'
};

export default function Video({videos}) {
    if (!videos || !videos.length) return null;
    const video = videos[0];
    const light = (video.poster) ? thurl.build(video.poster.url, {width: 1080, height: 420}) : false;
    return (
        <div className={styles.videoContainer}>
            <ReactPlayer url={video.url} config={config} light={light} {...playerProps}/>
        </div>
    )
}