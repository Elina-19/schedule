import React, {Component} from 'react';
import './DailySchedule.css';
import Service from '../../httpRequest/schedule';
import {fetchAudience} from '../../actions/actions'
import {connect} from "react-redux";

export class DailySchedule extends Component {
    static displayName = DailySchedule.name;

    render() {

        const { classes } = this.props;
        
        /*const content = classes.map(
            (ourClass, index) =>
                <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{ourClass.time}</th>
                    <th>{ourClass.groups}</th>
                    <th>{ourClass.name}</th>
                    <th>{ourClass.teacher}</th>
                </tr>
        )*/
        
        return (
            <table className="tableR">
                <thead>
                <tr>
                    <th></th>
                    <th>Время</th>
                    <th>Группа</th>
                    <th>Название предмета</th>
                    <th>Имя преподавателя</th>
                </tr>
                </thead>
                <tbody>
                    {classes}
                </tbody>
            </table>
        );
    }
}

