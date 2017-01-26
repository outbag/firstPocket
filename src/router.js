import React, { Component, PropTypes } from 'react';
import { Router, Route, Link,hashHistory } from 'react-router';
import { render } from 'react-dom';
import App from './containers/app';
import World from './containers/appWorld';
import Meeting from './components/Meeting';
import ClassRoom from './components/classRoom';

class Routers extends Component {
    render(){
        return (
            <Router history={hashHistory}>
                <Route path="/" component={ ClassRoom }>
                </Route>
            </Router>
        )
    }
}

export default Routers;