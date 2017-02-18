import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import RemoteVideo from './RemoteVideo';
import AgoraRTC from './AgoraRTCSDK-1.8.0';

let channel = "123";
let AppKey = "b7c2835c0fc941e480664d982f9dd88a";
let client = AgoraRTC.createRtcClient();
let uid = "teacher";
let disableAudio = false;
let disableVideo = false;
let localStream;

class VideoIndex extends Component {
    componentWillMount(){
        let role = this.props.role;
        localStream = AgoraRTC.createStream({
            streamID: uid,
            audio: true,
            // cameraId: videoSource.value, // 可选
            // microphoneId: audioSource.value, // 可选
            video: true,
            screen: false,
            attributes:{
                role:role
            }
        });
        // 设置分辨率
        localStream.setVideoProfile("120P");

    }
    componentDidMount() {
        let role = this.props.role;
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
                localStream = AgoraRTC.createStream({
                    streamID: uid,
                    audio: true,
                    // cameraId: videoSource.value, // 可选
                    // microphoneId: audioSource.value, // 可选
                    video: true,
                    screen: false,
                    attributes:{
                        role:role
                    }
                });
                // 初始化流
                localStream.init(function(){
                    console.log("Get UserMedia successfully");
                    // displayStream('66666', localStream,"100", "100", '',"");
                    localStream.play("mainView");
                    console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
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
    toggleVideo(){
        disableVideo = !disableVideo;
        if (disableVideo == true){
            localStream.disableVideo();
        }else {
            localStream.enableVideo();
        }
    }
    toggleAudio(){
        disableAudio = !disableAudio;
        if (disableAudio == true){
            localStream.disableAudio();
        }else {
            localStream.enableAudio();
        }
    }
    closeVideo(){
        localStream.close();
    }
    getStream(){
        return localStream;
    }
    studentSpeak(){
        console.log('apply speak');
    }
    render() {
        let role = this.props.role;
        let obj = this;
        let controlPanel = function(){
            if (role == 'teacher'){
                console.log('boom');
                return (
                    <div className="class-media-contorl-panel">
                        <button id="teacherToggleVideoBtn" onClick={obj.toggleVideo}>视频开关</button>
                        <button id="teacherToggleAudioBtn" onClick={obj.toggleAudio}>音频开关</button>
                    </div>
                )
            }else if (role == 'student'){
                return (
                    <div className="class-media-contorl-panel">
                        <button id="studentSpeakBtn" onClick={obj.studentSpeak}>请求发言</button>
                    </div>
                )
            }
        }
        let panel = controlPanel();
        return (
            <div className="video-index">
                <div id="mainView" className="video-view" ></div>
                <RemoteVideo client={client} uid={ uid }
                             closeVideo ={ this.closeVideo}
                             getStream = {this.getStream} />
                {panel}
            </div>
        )
    }
}

export default VideoIndex;
