import React, {Component} from 'react';
import {Layout} from '../General/Layout';
import {CurrentClass} from './CurrentClass';
import {StatusBar} from '../General/StatusBar';
import {DailySchedule} from './DailySchedule';
import {SwitchDay} from '../General/SwitchDay';
import '../custom.css'

export default class Class extends Component {

    static displayName = Class.name;

    render() {
        return (

            <Layout className="allPage">
                <StatusBar/>
                <CurrentClass/>
                <SwitchDay/>
                <DailySchedule/>
            </Layout>
        );
    }
}
