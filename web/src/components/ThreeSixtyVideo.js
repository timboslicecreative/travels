import styles from "./ThreeSixtyVideo.module.css"


export default class ThreeSixtyVideo extends React.Component {
    constructor() {
        super();
        this.container = React.createRef();
    }

    componentDidMount() {
        const {video} = this.props;

    }

    play = () => this.viewer.play();

    render () {
        return (
            <div>
                <div ref={this.container} className={styles.container} />
                <button onClick={this.play}>Play</button>
            </div>
        );
    }
}

