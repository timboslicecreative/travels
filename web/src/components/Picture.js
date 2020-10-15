import React, {useState, useEffect} from 'react';
import {thurl} from "lib/thumbor";
import styles from "./Picture.module.css";

export const PORTRAIT = 0;
export const LANDSCAPE = 1;
export const PANORAMA = 2;

export const orientation = (width, height) => {
    if (height > width) return PORTRAIT;
    if ((2 * height) > width) return LANDSCAPE;
    return PANORAMA;
};

export const imageOrientation = (image) => orientation(image.width, image.height);

const defaultSources = [
    // Breakpoint, Width, Height
    [420, {width: 420}],
    [768, {width: 768}],
    [1080, {width: 1080}],
    [1440, {width: 1440}],
    [1920, {width: 1920}],
];

export default function Picture({className, image, adjustments, sources}) {
    const [loaded, setLoaded] = useState(false);
    const loadingStyle = () => loaded ? styles.loaded : styles.loading;
    const genSources = () => (sources || defaultSources).map((sa, i) =>
        <source media={`(max-width:${sa[0]}px)`} srcSet={thurl.build(image.url, sa[1])} type={image.mime} key={i}/>
    );
    return (
        <picture className={`${styles.picture} ${className}`}>
            {genSources()}
            <img src={thurl.build(image.url, adjustments)}/>
        </picture>
    )
}