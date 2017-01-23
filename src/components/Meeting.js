import React, {Component, PropTypes} from 'react'
import {render} from 'react-dom'
import AgoraRTC from './AgoraRTCSDK-1.8.0'

class Meeting extends Component {



    render() {

        let channel = "channelName1";

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

                var wushuang1 = [];
                var wushuang2 = [];

                for (let i = 0; i !== devices.length; ++i) {
                    let device = devices[i];

                    // let option = document.createElement('option');
                    // option.value = device.deviceId;
                    if (device.kind === 'audioinput') {
                        // option.text = device.label || 'microphone ' + (audioSelect.length + 1);
                        // audioSelect.appendChild(option);
                        wushuang1.push(device.label);

                    } else if (device.kind === 'videoinput') {
                        // option.text = device.label || 'camera ' + (videoSelect.length + 1);
                        // videoSelect.appendChild(option);
                        wushuang2.push(device.label);
                    } else {
                        console.log('Some other kind of source/device: ', device);
                    }
                }

                console.log(wushuang1 + "8888888888888888888888888888888888+声音");
                console.log(wushuang2 + "8888888888888888888888888888888888+画面");
            });


            // 加入房间
            client.join(channel, undefined, function (uid) {

                console.log("User " + uid + " join channel successfully");
                console.log("Timestamp: " + Date.now());


                let localStream = AgoraRTC.createStream({
                    streamID: uid,
                    audio: true,
                    cameraId: videoSource.value,
                    microphoneId: audioSource.value,
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
                })
            });
        });

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
                <div id="video-container-multiple">


                </div>
            </div>
        )
    }
}

function displayStream(stream) {
    stream.play("video-container-multiple")
}

export default Meeting;