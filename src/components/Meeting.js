import React, {Component, PropTypes} from 'react'
import {render} from 'react-dom'
import AgoraRTC from './AgoraRTCSDK-1.8.0'

class Meeting extends Component {



    render() {

        let channel = "2";
        let localStream;
        var audioIds =[];
        var videoIds =[];
        // 创建一个客户端
        let client = AgoraRTC.createRtcClient();
        // console.log(AgoraRTC.createClient());

        // 监听错误
        client.on('error', function (err) {
            console.log(err);
            if (err.reason === 'INVALID_CHANNEL_NAME') {
                $.alert("Invalid channel name, Chinese characters are not allowed in channel name.");
            }
        });

        // 创建流
        client.init("b7c2835c0fc941e480664d982f9dd88a", function (obj) {
            console.log("AgoraRTC client initialized");

            // 获取设备
            AgoraRTC.getDevices(function (devices) {

                // let audioSelect = document.querySelector('select#audioSource');
                // let videoSelect = document.querySelector('select#videoSource');

                console.log(devices);
                console.log("**********************************");

                for (let i = 0; i !== devices.length; ++i) {
                    let device = devices[i];

                     let option = document.createElement('option');
                     option.value = device.deviceId;
                    if (device.kind === 'audioinput') {
                         //option.text = device.label || 'microphone ' + (audioSelect.length + 1);
                         //audioSelect.appendChild(option);
                        audioIds[audioIds.length + 1] = device.deviceId;

                    } else if (device.kind === 'videoinput') {
                         //option.text = device.label || 'camera ' + (videoSelect.length + 1);
                         //videoSelect.appendChild(option);
                        videoIds[videoIds.length + 1] = device.deviceId;
                    } else {
                        console.log('Some other kind of source/device: ', device);
                    }
                }
            });


            // 加入房间
            client.join(channel, undefined, function (uid) {

                console.log("User " + uid + " join channel successfully");
                console.log("Timestamp: " + Date.now());
                    if (localStream) {
                        // local stream exist already
                        client.unpublish(localStream, function(err) {
                            console.log("Unpublish failed with error: ", err);
                        });
                        localStream.close();
                    }

                    localStream = AgoraRTC.createStream({
                        streamID: uid,
                        audio: true,
                        cameraId: audioIds[0],
                        microphoneId:  videoIds[0],
                        video: true,
                        screen: false
                    });

                    localStream.setVideoProfile("320P");
                    localStream.init(function () {
                    console.log("Get UserMedia successfully");
                    displayStream(localStream);
                    client.publish(localStream, function (err) {
                        console.log("Timestamp: " + Date.now());
                        console.log("Publish local stream error: " + err);
                    });
                    client.on('stream-published',function(evt){
                        console.log('本地流已经推上服务器');
                    });
                })
            });
        });
        subscribe(client);
        return (
            <div>
                <div id="div_device" className="panel panel-default">
                    <div className="select">
                        <label htmlFor="audioSource">Audio source: </label>
                        <select id="audioSource" ></select>
                    </div>
                    <div className="select">
                        <label htmlFor="videoSource">Video source: </label>
                        <select id="videoSource" ></select>
                    </div>
                </div>
                <p>meeting</p>
                <input placeholder="roomNum"></input>
                <div id="parentNode" style={{height:"100px",width:"100px"}}>
                </div>
                <div id="remoteNode" style={{height:"100px",width:"100px"}}>
                </div>
            </div>
        )
    }
}

//订阅同房间的另外的流
function subscribe(client){
    //有人发布流之后就触发
    client.on('stream-added', function(evt) {
        var stream = evt.stream;
        console.log("New stream added: " + stream.getId());
        console.log("Timestamp: " + Date.now());
        console.log("Subscribe ", stream);
        client.subscribe(stream, function(err) {
            console.log("Subscribe stream failed", err);
        });
    });
    //收到流之后
    client.on('stream-subscribed', function(evt) {
        var stream = evt.stream;
        console.log("Got stream-subscribed event");
        console.log("Timestamp: " + Date.now());
        console.log("Subscribe remote stream successfully: " + stream.getId());
        console.log(evt);
        displayRemoteStream(stream);
        //updateRoomInfo();
    });

}

function displayStream(stream) {
    stream.play("parentNode")
}

function displayRemoteStream(stream){
    stream.play("remoteNode");
}

export default Meeting;