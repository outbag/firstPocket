import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import ClassLocalVideo from './classLocalVideo';
import ClassRemoteVideo from './classRemoteVideo';
import AgoraRTC from './AgoraRTCSDK-1.8.0';

let client =AgoraRTC.createLiveClient();

class classRoomVideo extends Component {

    //订阅同房间的另外的流

    leaveChannel(){
        client.leave(function () {
            alert(1)
        }, function () {
            alert(2)
        })
    }

    render() {
        // let client = AgoraRTC.createRtcClient();

        let uid = this.props.uid;
        let channel = this.props.channel;
        let AppKey = this.props.AppKey;
        let profession = this.props.profession;

        // 初始化并且加入房间
        client.init(AppKey, function () {
            client.join(channel, uid, function () {

                let localStream;
                //建立一条本地的流
                localStream = AgoraRTC.createStream({
                    streamID: uid,
                    audio: true,
                    video: true,
                    screen: false
                });

                //设置本地一条流的规格
                localStream.setVideoProfile('120p_1');

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

            }, function (err) {
                console.log(err + "加入房间失败")
            })
        }.bind(this));

        return (
            <div>
                <ClassRemoteVideo client={client}  />
                <ClassLocalVideo client={client} uid={uid} profession={profession} />
                <button onClick={this.leaveChannel.bind(this)}>离开频道</button>
                <div id="localView" className="local-view" ></div>
            </div>
        )
    }
}


export default classRoomVideo;