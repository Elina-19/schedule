import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Router from './components/Router/Router'
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import configureStore from './reduxComponents/configureStore';


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename={baseUrl}>
            <Router/>
        </BrowserRouter>
    </Provider>,
    rootElement
);

registerServiceWorker();

