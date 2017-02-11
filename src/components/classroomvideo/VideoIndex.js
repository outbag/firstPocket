import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import RemoteVideo from './RemoteVideo';
import AgoraRTC from './AgoraRTCSDK-1.8.0';

let channel = "channelName2";
let AppKey = "b7c2835c0fc941e480664d982f9dd88a";
let client = AgoraRTC.createLiveClient();
let uid = 2333333333;

class VideoIndex extends Component {

    componentDidMount() {
        // 报错监听
        client.on('error', function(err) {
            console.log(err);
            if (err.reason === 'INVALID_CHANNEL_NAME') {
                alert("Invalid channel name, Chinese characters are not allowed in channel name.");
                // 输入中文频道名字报错
            }
        });

        // 初始化一个流
        client.init(AppKey,function(){
            console.log("AgoraRTC client initialized");
            client.join(channel, uid, function(uid) {

                let localStream = AgoraRTC.createStream({
                    streamID: uid,
                    audio: true,
                    // cameraId: videoSource.value, // 可选
                    // microphoneId: audioSource.value, // 可选
                    video: true,
                    screen: false
                });

                // 设置分辨率
                localStream.setVideoProfile("120P");

                // 初始化流
                localStream.init(function(){
                    console.log("Get UserMedia successfully");
                    // displayStream('66666', localStream,"100", "100", '',"");

                    localStream.play("localView");

                    // 将本地流推出去
                    client.publish(localStream, function(err) {
                        console.log("Timestamp: " + Date.now());
                        console.log("Publish local stream error: " + err);
                    });
                });

                console.log("User " + uid + " join channel successfully"); // 加入房间成功回调
                console.log("Timestamp: " + Date.now());
            }, function(err){
                console.log(err); // 加入房间失败回调
            });
        });
    }

    render() {

        return (
            <div className="video-index">
                <div id="localView" className="video-view" ></div>
                <RemoteVideo client={ client } uid={ uid }/>
            </div>
        )
    }
}


export default VideoIndex;
