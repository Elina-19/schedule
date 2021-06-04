import React, {Component} from 'react';
import {Layout} from '../Layout/Layout';
import {StatusBar} from '../StatusBar/StatusBar';
import {DailySchedule} from '../DailySchedule/DailySchedule';
import {SwitchDay} from '../SwitchDay/SwitchDay';
import {CurrentClass} from "../CurrentClass/CurrentClass";

export default class Audience extends Component {

    static displayName = Audience.name;


    render() {
        const {currentLesson, lessons} = this.props.currentClass;
        
        return (
            <Layout className="allPage">
                <StatusBar />
                <CurrentClass currentLesson={currentLesson} audienceNumber={this.props.currentClass.number}/>
                <SwitchDay />
                <DailySchedule lessons={lessons}/>
            </Layout>
        );
    }
}

