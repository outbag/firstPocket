import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import RemoteVideoChildren from './RemoteVideoChildren';

let nextId = 0;

class RemoteVideo extends Component {

    constructor(props){
        super(props);
        this.state = {
            videoView: "video-view",
            array:[]
        };
    }


    componentDidMount() {

        let client = this.props.client;
        let closeVideo = this.props.closeVideo;
        let getStream = this.props.getStream;
        // 有流加入时监听
        client.on('stream-added', function (evt) {
            let stream = evt.stream;
            client.subscribe(stream, function (err) {
                console.log("Subscribe stream failed", err);
            });

        });


        client.on('stream-subscribed', (evt) => {
                let stream = evt.stream;
                let uid = nextId++;
                //用户身份是教师就显示在主窗口,并将本地流放入小窗口
                //用户id只能用整数，这里需要进行数据库的查询
                let myArray = this.state.array;
                if(stream.getId() == 110){
                    var localStream = getStream();
                    console.log('/////////////////////////////////////////////');
                    console.log(localStream);
                    console.log('/////////////////////////////////////////////');
                    closeVideo.close();
                    //stream.play("mainView");
                    myArray = [...myArray, {localStream, uid}];
                }else{
                    myArray = [...myArray, {stream, uid}];
                }
                this.setState({
                    array: myArray
                });
        });

        client.on('stream-removed', function(evt) {
            // let stream = evt.stream;
        });


        client.on('peer-leave', (evt) => {

            let myArray = this.state.array;
                myArray = myArray.filter((data) => data.stream !== evt.stream);
                this.setState({
                    array: myArray
                });
        });
    }

    render() {

        let testArray = this.state.array;

        let trueArray = testArray.map( function (data) {

            return(
                <RemoteVideoChildren uid={data.uid} key={data.uid} stream={data.stream}  />
            )
        });

        return (
            <div className="class-media-sub-view-frame">
                { trueArray }
                <div className="class-media-end-float"></div>
            </div>
        )
    }
}


export default RemoteVideo;