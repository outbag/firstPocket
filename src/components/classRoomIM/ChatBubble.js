import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

class ChatBubble extends Component {
    render() {
        let {userName,content,headIcon} = this.props;
        return (
            <div className="class-media-chat-bubble">
                <div className="class-media-chat-bubble-left-frame">
                    <img className="class-media-chat-bubble-head-icon"
                         ref="chatHeadIcon" src={headIcon}/>
                </div>
                <div className ="class-media-chat-bubble-right-frame">
                    <div className="class-media-chat-bubble-content-frame" >
                        <div className="class-media-chat-bubble-content" ref="chatContent">
                            {content}
                        </div>
                    </div>
                    <div className="class-media-chat-bubble-name-frame" >
                        <div className ="class-media-chat-bubble-name" ref="chatUserName">
                            {userName}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ChatBubble;