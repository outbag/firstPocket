import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import AgoraRTC from './AgoraRTCSDK-1.8.0';

class classLocalVideo extends Component {


    componentDidMount(){
        let client = this.props.client;
        let uid = this.props.uid;
        let profession = this.props.profession;

        if(profession == "teacher"){
            this.initLocalStream(client,uid)
        }

    }



    initLocalStream(client,uid){

        let localStream;
        //建立一条本地的流
        localStream = AgoraRTC.createStream({
            streamID: uid,
            audio: true,
            video: true,
            screen: false
        });

        //设置本地一条流的规格
        localStream.setVideoProfile('120P_1');

        //初始化本地的流
        localStream.init(function () {

            //把流推出去
            client.publish(localStream, function (err) {
                console.log("stream published");
            });

            //监听流是否已经推出
            client.on('stream-published', function (evt) {
                console.log('本地流已经推上服务器');
            });

            localStream.play("localView")
        });
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