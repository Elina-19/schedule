import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import FloorApp from './FloorApp';
import registerServiceWorker from './registerServiceWorker';
import Router from '../Router'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
       <Router/>
    </BrowserRouter>,
    rootElement);

registerServiceWorker();
