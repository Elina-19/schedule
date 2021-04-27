import React, {Component} from 'react';
import {Route} from 'react-router';
import {Layout} from '../components/Layout';
import{ CurrentClass} from '../components/CurrentClass';
import {StatusBar} from '../components/StatusBar';
import {DailySchedule} from '../components/DailySchedule';
import {FloorStatusBar} from './FloorStatusBar';
import Router from '../Router';
import App from '../App';

import '../custom.css'

export default class FloorApp extends Component {

    static displayName = App.name;
    //TODO сделать еще отдельные css для классов в FloorComponents и таблицу как вторую компоненту

    render() {
        const date = new Date();

        return (

            <Layout className="allPage">
                <FloorStatusBar/>
                <StatusBar/>
                <DailySchedule/>
            </Layout>
        );
    }
}