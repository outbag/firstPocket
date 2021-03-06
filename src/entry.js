import { Router, Route, Link,hashHistory } from 'react-router';
import {Component} from 'react';
import { Provider } from 'react-redux';
import './less/style.less';
import configureStore from './stores/store';
import Routers from './router';

const store = configureStore();

let Main = React.createClass({
    render() {
        return (
            <Provider store={store}>
                <Routers/>
            </Provider>
        );
    }
});

ReactDOM.render(React.createElement(Main),document.getElementById('content'));