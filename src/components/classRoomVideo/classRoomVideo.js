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
                console.log("加入房间成功")
            }, function (err) {
                console.log(err + "加入房间失败")
            })
        });

        return (
            <div>
                <ClassRemoteVideo client={client}  />
                <ClassLocalVideo client={client} uid={uid} profession={profession} />
                <button onClick={this.leaveChannel.bind(this)}>离开频道</button>
            </div>
        )
    }
}


export default classRoomVideo;