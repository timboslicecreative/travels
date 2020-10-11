import ReactMarkdown from 'react-markdown';
import MarkdownImage from "./MarkdownImage";

const renderers = {
    image: ({alt, src}) => {
        const hashRegexp = new RegExp("\\/([^\\/]*)(\\.[a-zA-Z]*)$", "gi");
        let results = hashRegexp.exec(src);
        let image = {
            hash: results[1],
            ext: results[2]
        };
        //return <Picture image={image} sources={imageSources} adjustments={imageAdjustments}/>;
        return <MarkdownImage image={image} />;
    }
};

export default ({source}) => (<ReactMarkdown source={source} renderers={renderers}/>)