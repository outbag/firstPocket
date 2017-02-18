import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import WhiteBoardIndex from './classroomwhiteboard/WhiteBoardIndex';
import VideoIndex from './classroomvideo/VideoIndex';
import ChatComponent from './classRoomIM/ChatComponent'

class Meeting extends Component {
    componentWillMount(){
        this.setState({
            role:"teacher"
        });
    }

    render() {
        return (
            <div className="container">
                <WhiteBoardIndex role={this.state.role}/>
                <div className="class-media">
                    <VideoIndex role={this.state.role}/>
                    <ChatComponent role={this.state.role}/>
                </div>
            </div>
        )
    }
}


export default Meeting;