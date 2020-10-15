import aframe from "aframe";
import styles from "./ThreeSixtyPhoto.module.css"
import {thurl} from "lib/thumbor";

const lowQuality = {
    width: 1080,
    filters: {
        blur: ['25'],
    }
};

export default class ThreeSixtyPhoto extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
    }

    render() {
        const {photos} = this.props;
        return (
            <div className={styles.threesixty}>
                <a-scene embedded>
                    <a-assets>
                        {photos.map(photo => <img crossOrigin="anonymous" id={`${photo.id}_hq`} key={`${photo.id}_hq`} src={thurl.build(photo.url)}/>)}
                    </a-assets>
                    <a-sky id="image-360-hq" src={`#${photos[0].id}_hq`} rotation="0 -90 0"></a-sky>
                    <a-camera look-controls-enabled reverse-mouse-drag position="0 0 0" id="camera-id" fov="60" ></a-camera>
                </a-scene>
            </div>
        )
    }
}

