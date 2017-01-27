import React, {Component, PropTypes} from 'react'
import {render} from 'react-dom'

class classRemoteVideo extends Component {

    componentDidMount(){
    }

    classRoomStatus(client){
        //有人发布流之后就触发
        client.on('stream-added', function (evt) {
            let stream = evt.stream;
            // console.log("New stream added: " + stream.getId());
            // console.log("Timestamp: " + Date.now());
            // console.log("Subscribe ", stream);
            client.subscribe(stream, function (err) {
                console.log("Subscribe stream failed", err);
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

        // 监听用户离开的回调
        client.on('peer-leave', function(evt) {
            let uid = evt.uid;
            log("remote user left", uid);
            alert("监听到"+ uid +"离开")

        });

        client.on("stream-removed", function(evt) {
            let stream = evt.stream;
            alert(2);
        });

        client.on("peer-mute-video", function (event) {

            let message = event.msg;
            if (message.muted) {
                console.log("remote user " + message.uid + " muted video");
            } else {
                console.log("remote user " + message.uid + " unmuted video");
            }
        })
    }

    render() {
        let client = this.props.client;
        this.classRoomStatus(client);
        return(
            <div id="remoteView" className="remote-view">

            </div>
        )
    }


}

export default classRemoteVideo;