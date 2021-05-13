import React, {Component} from 'react';
import {Layout} from '../Layout/Layout';
import {CurrentClass} from '../CurrentClass/CurrentClass';
import {StatusBar} from '../StatusBar/StatusBar';
import {DailySchedule} from '../DailySchedule/DailySchedule';
import {SwitchDay} from '../SwitchDay/SwitchDay';

export default class Audience extends Component {

    static displayName = Audience.name;

    render() {
        return (

            <Layout className="allPage">
                <StatusBar/>
                <CurrentClass/>
                <SwitchDay/>
               
            </Layout>
        );
    }
}
