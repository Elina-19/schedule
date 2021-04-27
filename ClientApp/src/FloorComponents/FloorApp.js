import React, {Component} from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import {StatusBar} from './components/StatusBar';
import {FloorSchedule} from './FloorComponents/FloorSchedule';
import {StatysDailySchedule} from './components/StatusDailySchedule';

import './custom.css'

export default class FloorApp extends Component {

    static displayName = FloorApp.name;

    render() {
        const date = new Date();
        
        return (

            <Layout classname="allPage">
                <Route exact path='/' component={StatusBar}/>
                <Route exact path='/' component={StatusDailySchedule}/>
                <Route exact path='/' component={FloorSchedule}/>
            </Layout>
        );
    }
}