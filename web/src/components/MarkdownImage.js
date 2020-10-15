import React, {useState, useEffect} from 'react';
import {thurl} from "lib/thumbor";
import Picture, {imageOrientation} from "./Picture";
import styles from "./MarkdownImage.module.css";

const orientationAdjustments = [
    {width: 270}, // 0-Portrait
    {width: 540}, // 1-Landscape
    {width: 1080}, // 2-Panorama
];

const orientationSources = [
    // Portrait
    [
        [420, {width: 420}],
        [768, {width: 192}],
        [1080, {width: 270}],
    ],
    // Landscape
    [
        [420, {width: 420}],
        [768, {width: 384}],
        [1080, {width: 540}],
    ],
    // Panorama
    [
        [420, {width: 420}],
        [768, {width: 768}],
        [1080, {width: 1080}],
    ],
];

const orientationAdjustment = (image) => orientationAdjustments[imageOrientation(image)];
const orientationSource = (image) => orientationSources[imageOrientation(image)];

export default function MarkdownImage({image}) {
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const hasSize = () => width && height;
    const onImgLoad = function ({target: img}) {
        setHeight(img.offsetHeight);
        setWidth(img.offsetWidth);
    };
    let modifiedImage = {width: width, height: height, ...image};
    if (hasSize()) return (
        <Picture image={modifiedImage}
                 sources={orientationSource(modifiedImage)}
                 adjustments={orientationAdjustment(modifiedImage)}
        />
        );
    return (
        <img src={thurl.build(image.url, {width: 10, filters:{quality: [30]}})} onLoad={onImgLoad} className={styles.image}/>
    )
}