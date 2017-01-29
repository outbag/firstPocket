import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import AgoraRTC from '../../../../quesbook-website/src/components/Video/AgoraRTCSDK-1.8.0';

class classLocalVideo extends Component {


    componentDidMount(){
        // let client = this.props.client;
        // let uid = this.props.uid;
        // let profession = this.props.profession;
        //
        // if(profession == "teacher"){
        //     this.initLocalStream(client,uid)
        // }

    }





    render() {

        return (
            <div >
                <div id="localView" className="local-view" ></div>
            </div>
        )
    }
}





export default classLocalVideo;