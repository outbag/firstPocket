import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';

//目前没办法切换
class RemoteVideoChildren extends Component {

    componentDidMount() {
        let stream = this.props.stream;
        let uid = this.props.uid;
        stream.play("subView"+uid);
    }

    render() {
        let uid = this.props.uid;
        return (
            <div>
                <div id={"subView"+uid}  className="class-media-sub-view"></div>
            </div>
        )
    }
}

export default RemoteVideoChildren;