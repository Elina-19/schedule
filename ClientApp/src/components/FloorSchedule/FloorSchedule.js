import React, {Component} from 'react';
import Service from '../../httpRequest/schedule';
import {fetchAudience} from '../../actions/actions'
import {connect} from "react-redux";

export class FloorSchedule extends Component {
    static displayName = FloorSchedule.name;

    render() {
        
        const { lessons } = this.props;
        console.log(this.props);
        const content = lessons.currentClass.floor.audiences.map(
            (ourClass, index) =>
                <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{ourClass.currentLesson.time}</th>
                    <th>{ourClass.currentLesson.groups.map(
                        (group) =>
                            group + " " 
                    )}</th>
                    <th>{ourClass.currentLesson.discipline}</th>
                    <th>{ourClass.currentLesson.teacher}</th>
                </tr>
        )

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
                {content}
                </tbody>
            </table>
        );
    }
}
