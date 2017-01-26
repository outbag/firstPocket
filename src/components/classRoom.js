import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router';
import { render } from 'react-dom';
import ClassRoomVideo from './classRoomVideo/classRoomVideo';
import WhiteBoardIndex from './classRoomWhiteBoard/whiteboardindex';

class hello extends Component {

    constructor(props){
        super(props);
        this.state = {
            channel:"123",
            AppKey:"b7c2835c0fc941e480664d982f9dd88a",
            uid:12112121212121,
            profession:"teacher"
        }
    }


    render() {
        let AppKey = this.state.AppKey;
        let channel = this.state.channel;
        let uid = this.state.uid;
        let profession = this.state.profession;
        return (
            <div>
                <ClassRoomVideo
                    AppKey={AppKey}
                    channel={channel}
                    uid={uid}
                    profession={profession}
                    />
                <WhiteBoardIndex/>
            </div>
        )
    }
}

export default hello;

