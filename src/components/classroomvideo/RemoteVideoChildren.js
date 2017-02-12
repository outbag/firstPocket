import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';


class RemoteVideoChildren extends Component {

    componentDidMount() {
        let stream = this.props.stream;
        let uid = this.props.uid;
        stream.play("remoteView"+uid);
    }

    render() {
        let uid = this.props.uid;
        return (
            <div>
                <div id={"remoteView"+uid}  className="class-media-remote-view"></div>
            </div>
        )
    }
}

export default RemoteVideoChildren;