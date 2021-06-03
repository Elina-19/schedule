import React, {Component} from 'react';
import {Layout} from '../Layout/Layout';
import {StatusBar} from '../StatusBar/StatusBar';
import {DailySchedule} from '../DailySchedule/DailySchedule';
import {SwitchDay} from '../SwitchDay/SwitchDay';
import CurrentClassContainer from "../../containers/CurrentClassContainer";

export default class Audience extends Component {

    static displayName = Audience.name;

    transformClass(){
        try {
            const idRegExp = /\/([0-9]*)\/$/;
            return window.location.href.match(idRegExp)[1];
        } catch (error) {
            return 2;
        }
    }
    
    render() {
        return (

            <Layout className="allPage">
                <StatusBar />
                <CurrentClassContainer audienceId={ this.transformClass()} />
                <SwitchDay />
                <DailySchedule dailyScheduleId={ this.transformClass()}/>
            </Layout>
        );
    }
}
