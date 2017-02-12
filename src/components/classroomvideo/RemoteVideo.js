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
                console.log(evt);

                let myArray = this.state.array;
                myArray = [...myArray, {stream, uid}];

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
            <div className="class-media-remote-frame">
                { trueArray }
                <div className="class-media-remote-end-float"></div>
            </div>
        )
    }
}


export default RemoteVideo;