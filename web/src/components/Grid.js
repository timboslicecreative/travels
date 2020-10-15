import Link from 'next/link'
import styles from "./Grid.module.css";
import Picture, {imageOrientation} from "./Picture"


const orientationAdjustments = [
    {width: 270, height: 270 * 1.5}, // 0-Portrait
    {width: 540, height: 540 * 0.75}, // 1-Landscape
    {width: 1080}, // 2-Panorama
];

const orientationStyles = [
    styles.tilePortrait, // 0-Portrait
    styles.tileLandscape, // 1-Landscape
    styles.tilePanorama, // 2-Panorama
];

const orientationSources = [
    // Portrait
    [
        [420, {width: 210, height: 210 * 1.5}],
        [768, {width: 192, height: 192 * 1.5}],
        [1080, {width: 270, height: 270 * 1.5}],
    ],
    // Landscape
    [
        [420, {width: 420, height: 420 * .75}],
        [768, {width: 384, height: 384 * .75}],
        [1080, {width: 540, height: 540 * .75}],
    ],
    // Panorama
    [
        [420, {width: 420}],
        [768, {width: 768}],
        [1080, {width: 1080}],
    ],
];

const orientationStyle = (image) => orientationStyles[imageOrientation(image)];
const orientationAdjustment = (image) => orientationAdjustments[imageOrientation(image)];
const orientationSource = (image) => orientationSources[imageOrientation(image)];

export const orderTiles = (tiles) => {
    const rowMax = 4;
    const count = tiles.length;
    const orientationWeights = [
        1, 2, 4,  // Portrait, Landscape, Panorama
    ];
    const imageWeight = image => orientationWeights[imageOrientation(image)];

    let i = 0,
        weight = 0,
        found = null,
        rowLength = 0;

    const find = (from, size) => {
        for (; from < count; from++) {
            if (!tiles[from].image) continue;
            if ((weight = imageWeight(tiles[from].image)) <= size) return from;
        }
        return null
    };

    for (; i < count; i++) {
        if (!tiles[i].image) continue;
        weight = imageWeight(tiles[i].image);
        if (rowLength + weight > rowMax && (found = find(i + 1, rowMax - rowLength))) {
            tiles.splice(i, 0, tiles.splice(found, 1)[0]);
        }
        rowLength += weight;
        if (rowLength >= rowMax) rowLength = 0
    }

    return tiles
};

export default function Grid({tiles, className, areMore, loadMore}) {
    return (
        <div className={`${styles.grid} ${className}`}>
            {orderTiles(tiles).map((tile, index) =>
                <Tile title={tile.title} href={tile.href} as={tile.as} image={tile.image} key={tile.key || index}/>
            )}
            { areMore ? <button type={"button"} onClick={loadMore}>Load More</button> : ''}
        </div>
    )
};

export const Tile = ({title, href, as, image}) => {
    return (
        <div className={`${styles.tile} ${orientationStyle(image)}`}>
            <div className={styles.tileInner}>
                <Picture image={image}
                         sources={orientationSource(image)}
                         adjustments={orientationAdjustment(image)}
                         className={`${styles.image}`} />
                <Link href={href} as={as}>
                    <a className={styles.title}>
                        <span>{title}</span>
                    </a>
                </Link>
            </div>
        </div>
    )
};
