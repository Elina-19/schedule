import React, {Component} from 'react';
import {Layout} from '../Layout/Layout';
import {StatusBar} from '../StatusBar/StatusBar';
import {FloorSchedule} from '../FloorSchedule/FloorSchedule';
import {SwitchDay} from '../SwitchDay/SwitchDay'

export default class Floor extends Component {

    static displayName = Floor.name;
    //TODO сделать еще отдельные css для классов в FloorComponents и таблицу как вторую компоненту

    render() {
        return (

            <Layout className="allPage">
                <StatusBar/>
                <SwitchDay/>
                <FloorSchedule/>
            </Layout>
        );
    }
}