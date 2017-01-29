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
        client.init("b7c2835c0fc941e480664d982f9dd88a", function () {
            AgoraRTC.getDevices(function(devices){});
            client.join(channel, undefined, function (uid) {
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
                    displayStream('66666', localStream,"100", "100", '',"");
                    client.publish(localStream, function(err) {
                        console.log("Timestamp: " + Date.now());
                        console.log("Publish local stream error: " + err);
                    });
                });
                //收到流之后
                client.on('stream-subscribed', function (evt) {
                    let stream = evt.stream;
                    // console.log("Got stream-subscribed event");
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

        return (
            <div>

                <div id="video-container-multiple">
                    <div id="66666b7c2835c0fc941e480664d982f9dd88a" className="" data-stream-id="b7c2835c0fc941e480664d982f9dd88a" style={{height:'100px',width:'100px'}}></div>

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

export default classRoomVideo;