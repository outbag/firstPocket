import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import ClassLocalVideo from './classLocalVideo';
import ClassRemoteVideo from './classRemoteVideo';



class classRoomVideo extends Component {

    //订阅同房间的另外的流

    render() {
        let client = AgoraRTC.createRtcClient();
        // let client =AgoraRTC.createLiveClient();
        let uid = this.props.uid;
        let channel = this.props.channel;
        let AppKey = this.props.AppKey;
        let profession = this.props.profession;

        // client.setChannelProfile("live-broadcasting");
        // client.setClientRole("broadcaster", null);
        // 初始化并且加入房间
        client.init(AppKey, function () {
            client.join(AppKey, channel, uid)
        });

        return (
            <div>
                <ClassRemoteVideo client={client}  />
                <ClassLocalVideo client={client} uid={uid} profession={profession} />
            </div>
        )
    }
}


export default classRoomVideo;