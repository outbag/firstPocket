/**
 * Created by buhe on 2017/1/25.
 */
import React, {Component, PropTypes} from 'react'
import {render} from 'react-dom'
const findDOMNode = ReactDOM.findDOMNode;
export default class WhiteBoard extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const aww = findDOMNode(this.refs.aww);
        this.awwWhiteBoard = new AwwBoard(aww, {
            apiKey: this.props.apiKey, //'87b3416b-cfcd-45f0-841f-b5d9e57bf47e'
            boardLink: this.props.boardLink //'5aj5342-56tz-uhjk-9811'
        });
    }

    render() {
        return (
            <div style={this.props.style} id="aww-wrapper" ref="aww">
            </div>
        )
    }
}

WhiteBoard.propTypes = {
    apiKey: React.PropTypes.string,
    boardLink: React.PropTypes.string,
    style: React.PropTypes.object
};
