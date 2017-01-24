import React, {Component, PropTypes} from 'react'
import {render} from 'react-dom'

class Meeting extends Component {


    render() {


        let channel = "channelName1";
        let localStream;
        let key = "b7c2835c0fc941e480664d982f9dd88a";

        // 创建一个客户端
        let client = AgoraRTC.createRtcClient();

        // 监听错误
        client.on('error', function (err) {
            console.log(err);
            if (err.reason === 'INVALID_CHANNEL_NAME') {
                $.alert("Invalid channel name, Chinese characters are not allowed in channel name.");
            }
        });

        // 创建流
        client.init(key, function (obj) {
            console.log("AgoraRTC client initialized");


            // 加入房间
            client.join(key, channel, 0, function (uid) {

                console.log("User " + uid + " join channel successfully");
                console.log("Timestamp: " + Date.now());
                if (localStream) {
                    client.unpublish(localStream, function (err) {
                        console.log("Unpublish failed with error: ", err);
                    });
                    localStream.close();
                }
                localStream = AgoraRTC.createStream({
                    streamID: uid,
                    audio: true,
                    video: true,
                    screen: false,
                    local: true
                });

                localStream.setVideoProfile('480P_6');
                localStream.init(function () {
                    console.log("Get UserMedia successfully");
                    displayStream(localStream);
                    client.publish(localStream, function (err) {
                        console.log("stream published");
                    });
                    client.on('stream-published', function (evt) {
                        console.log('本地流已经推上服务器');
                    });
                })
            });
        });
        subscribe(client);
        return (
            <div>
                <div id="parentNode" style={{height: "300px", width: "300px"}}></div>
                <div id="remoteNode" style={{height: "300px", width: "300px"}}></div>
            </div>
        )
    }
}


//订阅同房间的另外的流
function subscribe(client) {
    //有人发布流之后就触发
    client.on('stream-added', function (evt) {
        let stream = evt.stream;
        console.log("New stream added: " + stream.getId());
        console.log("Timestamp: " + Date.now());
        console.log("Subscribe ", stream);
        client.subscribe(stream, function (err) {
            console.log("Subscribe stream failed", err);
        });
    });
    //收到流之后
    client.on('stream-subscribed', function (evt) {
        let stream = evt.stream;
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

function displayRemoteStream(stream) {
    stream.play("remoteNode");
}

export default Meeting;