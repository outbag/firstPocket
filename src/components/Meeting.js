import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import WhiteBoardIndex from './classroomwhiteboard/WhiteBoardIndex';
import VideoIndex from './classroomvideo/VideoIndex';



class Meeting extends Component {


    componentDidMount() {


    }



    render() {
        return (
            <div>
                <WhiteBoardIndex/>
                <VideoIndex/>
            </div>
        )
    }
}


export default Meeting;