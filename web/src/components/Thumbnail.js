import {thumborUrl} from "../lib/thumbor";

export default ({image, adjustments = {width: 0, height: 100}, className}) => {
    return (
        <img src={thumborUrl(image, adjustments)}
             className={`thumbnail ${className}`} />
    )
};