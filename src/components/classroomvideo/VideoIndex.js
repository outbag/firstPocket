import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import RemoteVideo from './RemoteVideo';
import AgoraRTC from './AgoraRTCSDK-1.8.0';

class VideoIndex extends Component {
    constructor(props) {
      super(props);
      this.state = {
        disableAudio: false,
        disableVideo: false,
        channel: "123",
        AppKey: "b7c2835c0fc941e480664d982f9dd88a",
        client: AgoraRTC.createRtcClient(),
        uid: "teacher",
        localStream:null,
      };
    }

    componentWillMount(){
        let role = this.props.role;
        this.setState({localStream : AgoraRTC.createStream({
            streamID:  this.state.uid,
            audio: true,
            // cameraId: videoSource.value, // 可选
            // microphoneId: audioSource.value, // 可选
            video: true,
            screen: false,
            attributes:{
                role:role
            }
          })
        })
        // 设置分辨率
        this.state.localStream.setVideoProfile("120P");

    }
    componentDidMount() {
        let role = this.props.role;
        // 报错监听
        this.state.client.on('error', function(err) {
            console.log(err);
            if (err.reason === 'INVALID_CHANNEL_NAME') {
                alert("Invalid channel name, Chinese characters are not allowed in channel name.");
                // 输入中文频道名字报错
            }
        });

        let fack = this;
        // 初始化一个流
        this.state.client.init(AppKey,function(){
            console.log("AgoraRTC client initialized");
            fack.state.client.join(fack.state.channel, fack.state.uid, function(uid) {
                fack.state.localStream = AgoraRTC.createStream({
                    streamID: fack.state.uid,
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
                fack.state.localStream.init(function(){
                    console.log("Get UserMedia successfully");
                    // displayStream('66666', localStream,"100", "100", '',"");
                    fack.state.localStream.play("mainView");
                    console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
                    // 将本地流推出去
                    fack.state.client.publish(fack.state.localStream, function(err) {
                        console.log("Timestamp: " + Date.now());
                        console.log("Publish local stream error: " + err);
                    });
                });

                console.log("User " + fack.state.uid + " join channel successfully"); // 加入房间成功回调
                console.log("Timestamp: " + Date.now());
            }, function(err){
                console.log(err); // 加入房间失败回调
            });
        });
    }
    toggleVideo(){
      this.setState({disableVideo: !this.state.disableVideo});
        if (this.state.disableVideo == true){
          this.state.localStream.disableVideo();
        }else {
          this.state.localStream.enableVideo();
        }
    }
    toggleAudio(){
      this.setState({disableAudio:!this.state.disableAudio})
      if (this.state.disableAudio == true){
        this.state.localStream.disableAudio();
      } else {
        this.state.localStream.enableAudio();
      }
    }
    closeVideo(){
        this.state.localStream.close();
    }
    getStream(){
        return this.state.localStream;
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
                <RemoteVideo client={obj.state.client} uid={ obj.state.uid }
                             closeVideo ={obj.closeVideo}
                             getStream = {obj.getStream} />
                {panel}
            </div>
        )
    }
}

export default VideoIndex;
