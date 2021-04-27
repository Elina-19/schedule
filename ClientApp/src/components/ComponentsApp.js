import React, {Component} from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import {CurrentClass} from './components/CurrentClass';
import {StatusBar} from './сomponents/StatusBar';
import {DailySchedule} from './components/DailySchedule';
import {StatusDailySchedule} from './components/StatusDailySchedule';

import './custom.css'//возможно каждый отдельно надо импортировать

export default class FloorApp extends Component {

    static displayName = App.name;

    render() {
        const date = new Date();

        return (

            <Layout className="allPage">
                <Route exact path='/' component={StatusBar}/>
                <Route exact path='/' component={CurrentClass}/>
                <Route exact path='/' component={StatusDailySchedule}/>
                <Route exact path='/' component={DailySchedule}/>
            </Layout>
        );
    }
}