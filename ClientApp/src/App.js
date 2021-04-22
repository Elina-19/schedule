import React, {Component} from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import {CurrentClass} from './components/CurrentClass';
import {StatusBar} from './components/StatusBar';
import {DailySchedule} from './components/DailySchedule';

import './custom.css'

export default class App extends Component {

    static displayName = App.name;

    render() {
        const date = new Date();

        return (

            <Layout>
                <StatusBar date = {date} />
                <Route exact path='/' component={CurrentClass}/>
                <Route exact path='/' component={DailySchedule}/>
            </Layout>
                );
    }
}
