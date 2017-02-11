import React, { Component, PropTypes } from 'react';
import { Router, Route, Link,hashHistory } from 'react-router';
import { render } from 'react-dom';
import Meeting from './components/Meeting';

class Routers extends Component {
    render(){
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Meeting}>
                </Route>
            </Router>
        )
    }
}

export default Routers;