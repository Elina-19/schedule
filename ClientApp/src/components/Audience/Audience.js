import React, {Component} from 'react';
import {Layout} from '../Layout/Layout';
import {StatusBar} from '../StatusBar/StatusBar';
import {DailySchedule} from '../DailySchedule/DailySchedule';
import {SwitchDay} from '../SwitchDay/SwitchDay';
import CurrentClassContainer from "../../containers/CurrentClassContainer";

export default class Audience extends Component {

    static displayName = Audience.name;

    render() {
        return (

            <Layout className="allPage">
                <StatusBar />
                <CurrentClassContainer audienceId={ 1201} />
                <SwitchDay />
                <DailySchedule dailyScheduleId={ 1201}/>
            </Layout>
        );
    }
}
