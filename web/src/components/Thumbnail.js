import {thurl} from "lib/thumbor";

export default function Thumbnail({image, adjustments = {width: 0, height: 100}, className}) {
    return (
        <img src={thurl.build(image.url, adjustments)}
             className={`thumbnail ${className}`}/>
    )
};