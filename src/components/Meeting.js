import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import WhiteBoardIndex from './classroomwhiteboard/WhiteBoardIndex';
import VideoIndex from './classroomvideo/VideoIndex';
import ChatComponent from './classRoomIM/ChatComponent'

class Meeting extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div className="container">
                <WhiteBoardIndex/>
                <div className="class-media">
                    <VideoIndex/>
                    <ChatComponent/>
                </div>
            </div>
        )
    }
}


export default Meeting;