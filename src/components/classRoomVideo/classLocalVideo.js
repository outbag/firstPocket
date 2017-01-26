import React, {Component, PropTypes} from 'react'
import {render} from 'react-dom'

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
            audio: false,
            video: true,
            screen: false,
            local: true

        });

        //设置本地一条流的规格
        localStream.setVideoProfile('480P_3');

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

            // this.setState({test: localStream});
            //把流 preview 出来
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