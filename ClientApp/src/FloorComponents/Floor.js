import React, {Component} from 'react';
import {Layout} from '../General/Layout';
import {StatusBar} from '../General/StatusBar';
import {DailySchedule} from '../ClassComponents/DailySchedule';

import '../custom.css'

export default class Floor extends Component {

    static displayName = Floor.name;
    //TODO сделать еще отдельные css для классов в FloorComponents и таблицу как вторую компоненту

    render() {
        const date = new Date();

        return (

            <Layout className="allPage">
                <StatusBar/>
                <DailySchedule/>
            </Layout>
        );
    }
}