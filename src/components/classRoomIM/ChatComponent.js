import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import ChatBubble from './ChatBubble';

class ChatComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            auth : firebase.auth(),
            database : firebase.database(),
            storage : firebase.storage(),
            messagesRef:firebase.database().ref('messages'),
            text:"a",
            messageArray:[]
        }
    }
    componentWillMount(){
        this.checkSetup();
        this.state.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
    }
    componentDidMount(){
        this.signIn();
    }
    signIn(){
        //目前暂时使用弹出验证的方式进行登录
        //var provider = new firebase.auth.GoogleAuthProvider();
        //this.state.auth.signInWithPopup(provider);
        //这里必须让用户登录google得到googleUser对象
        //var credential = firebase.auth.GoogleAuthProvider.credential("",
        //    "");
        //this.state.auth.signInWithCredential(credential);
    }
    saveMessage(){
        if (this.refs.message && this.checkSignedInWithMessage()) {
            let currentUser = this.state.auth.currentUser;
            // push到数据库
            this.state.messagesRef.push({
                name: currentUser.displayName,
                text: this.refs.message.value,
                photoUrl: currentUser.photoURL || '/images/profile_placeholder.png'
            }).then(function() {
                // 清空输入框
                console.log(this.refs.messageWindow.scrollTop);
                this.refs.messageWindow.scrollTop = this.refs.messageWindow.scrollHeight;
                this.refs.message.value = "";
                this.refs.message.focus();
            }.bind(this)).catch(function(error) {
                console.error('Error writing new message to Firebase Database', error);
            });
        }
    }
    checkSignedInWithMessage(){
        if (this.state.auth.currentUser) {
            return true;
        }
        // Display a message to the user using a Toast.
        var data = {
            message: 'You must sign-in first',
            timeout: 2000
        };
        alert('You must sign-in first');
        return false;
    }
    checkSetup(){
        if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
            window.alert('You have not configured and imported the Firebase SDK. ' +
                'Make sure you go through the codelab setup instructions.');
        } else if (config.storageBucket === '') {
            window.alert('Your Firebase Storage bucket has not been enabled. Sorry about that. This is ' +
                'actually a Firebase bug that occurs rarely. ' +
                'Please go and re-generate the Firebase initialisation snippet (step 4 of the codelab) ' +
                'and make sure the storageBucket attribute is not empty. ' +
                'You may also need to visit the Storage tab and paste the name of your bucket which is ' +
                'displayed there.');
        }
    }
    logOut(){
        this.state.auth.signOut();
    }
    //用户登录后，auth对象变化触发
    onAuthStateChanged(user){
        if (user) { // User is signed in!
            // Get profile pic and user's name from the Firebase user object.
            var profilePicUrl = user.photoURL;    // TODO(DEVELOPER): Get profile pic.
            var userName = user.displayName;      // TODO(DEVELOPER): Get user's name.

            // Set the user's profile pic and name.
            //this.state.userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
            //this.state.userName.textContent = userName;

            // Show user's profile and sign-out button.
            //this.userName.removeAttribute('hidden');
            //this.userPic.removeAttribute('hidden');
            //this.signOutButton.removeAttribute('hidden');

            // Hide sign-in button.
            //this.signInButton.setAttribute('hidden', 'true');

            // We load currently existing chant messages.
            this.loadMessages();
        } else { // User is signed out!
            // Hide user's profile and sign-out button.
            //this.userName.setAttribute('hidden', 'true');
            //this.userPic.setAttribute('hidden', 'true');
            //this.signOutButton.setAttribute('hidden', 'true');

            // Show sign-in button.
            //this.signInButton.removeAttribute('hidden');
        }
    }
    loadMessages(){
        // Reference to the /messages/ database path.
        this.state.messagesRef = this.state.database.ref('messages');
        // Make sure we remove all previous listeners.
        this.state.messagesRef.off();

        // Loads the last 12 messages and liste.n for new ones
        var setMessage = function(data) {
            var val = data.val();
            this.displayMessage(data.key, val.name, val.text, val.photoUrl, val.imageUrl);
        }.bind(this);
        this.state.messagesRef.limitToLast(12).on('child_added', setMessage);
        this.state.messagesRef.limitToLast(12).on('child_changed', setMessage);
    }
    displayMessage(key, userName, content, headIcon, picUrl){
        let messageArray = this.state.messageArray;
        messageArray = [...messageArray, {key,userName, content,headIcon,picUrl}];
        console.log(messageArray);
        this.setState({
            messageArray: messageArray
        });
        this.refs.messageWindow.scrollTop = this.refs.messageWindow.scrollHeight;
        this.refs.message.focus();
    }
    render() {
        let messageArray = this.state.messageArray;

        let bubbleList = messageArray.map( function (data) {

            return(
                <ChatBubble userName={data.userName}
                            content={data.content} headIcon={data.headIcon}  />
            )
        });
        return (
            <div className="class-media-chat-frame">
                <div className="class-media-message-display-frame" ref="messageWindow">
                    {bubbleList}
                </div>
                <div className="class-media-chat-input-frame">
                    <input className="class-media-message-input" ref="message" ></input>
                    <button className="class-media-message-send-btn" onClick={this.saveMessage.bind(this)}>send</button>
                    <button className="class-media-message-image-btn">image</button>
                    <button className="class-media-message-image-btn" onClick={this.logOut.bind(this)}>logout</button>
                </div>
            </div>
        )
    }
}

export default ChatComponent;