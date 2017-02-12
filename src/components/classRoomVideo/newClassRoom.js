import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import ClassLocalVideo from './classLocalVideo';
import ClassRemoteVideo from './classRemoteVideo';
import AgoraRTC from './AgoraRTCSDK-1.8.0';

class newClassRoom extends Component {
    //订阅同房间的另外的流

    componentDidMount(){
        this.client = AgoraRTC.createLiveClient();
        let client = this.client;
        let uid = this.props.uid;
        let channel = this.props.channel;
        let AppKey = this.props.AppKey;
        let profession = this.props.profession;

        client.init(AppKey, function () {
            client.join(channel, undefined, function () {
                let localStream = AgoraRTC.createStream({
                    streamID: uid,
                    audio: true,
                    cameraId: "42d5dfcf85fb577a11ddb38aa6041de35073c405b2a57f565c0a24aafff30dd6",
                    microphoneId: "f3236004a280f08b17e8a7f1679f6c5da7ff469f58ab49037a0c0f54ff31bf7e",
                    video: true,
                    screen: false
                });
                localStream.setVideoProfile("120P");
                localStream.init(function(){
                    console.log("Get UserMedia successfully");
                    //displayStream('66666', localStream,"400", "400", '',"");
                    client.publish(localStream, function(err) {
                        console.log("Timestamp: " + Date.now());
                        console.log("Publish local stream error: " + err);
                    });
                });
                //收到流之后
                client.on('stream-subscribed', function (evt) {
                    let stream = evt.stream;
                    console.log("Got stream-subscribed event");
                    // console.log("Timestamp: " + Date.now());
                    // console.log("Subscribe remote stream successfully: " + stream.getId());
                    // console.log(evt);
                    stream.play("remoteView");
                });
                console.log("加入房间成功")
            }, function (err) {
                console.log(err + "加入房间失败")
            });
        });
    }



    leaveChannel(){
        client.leave(function () {
            alert(1)
        }, function () {
            alert(2)
        })
    }

    render() {
        displayStream()
        return (
            <div>
                <div id="video-container-multiple">
                </div>
            </div>
        )
    }
}

function displayStream(tagId, stream, width, height, className, parentNodeId) {
    var styleStr = 'width:' + width + 'px; height:' + height + 'px;';
    var $container = $("#video-container-multiple");
    console.log(stream.getId()+"***-*-*-*-*-*-*");
    $container.append('<div id="gogogo" class="' + className + '" data-stream-id="' + stream.getId() + '" style="' + styleStr + '"></div>');
    stream.play("gogogo");
}

export default newClassRoom;