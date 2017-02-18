import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Firebase } from 'fireBase';

class FireBasePage extends Component {

    render() {
        var myFirebaseRef = new Firebase("https://app.firebaseio.com/");
        myFirebaseRef.set({
            title: "Hello World!",
            author: "Firebase",
            location: {
                city: "San Francisco",
                state: "California",
                zip: 94103
            }
        });
        myFirebaseRef.child("location/city").on("value", function(snapshot) {
            alert(snapshot.val());  // Alerts "San Francisco"
        });
        return (
            <div>
               <div>test</div>
            </div>
        )
    }
}


export default FireBasePage;