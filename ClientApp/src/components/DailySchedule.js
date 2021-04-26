import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import './DailySchedule.css';

export class DailySchedule extends Component {
    static displayName = DailySchedule.name;

    constructor(props) {
        super(props);


        var today = new Date(),
            time =  today.toLocaleTimeString();

        this.state = {
            time: time,
            classes: [
                {
                    time: 'Время',
                    nameOfDiscipline: 'Название предмета',
                    groupNumber: 'Группа',
                    teacherName: 'Имя преподавателя'
                },
                {
                    time: '8:30-10:00',
                    nameOfDiscipline: 'Англ. яз',
                    groupNumber: '11-905',
                    teacherName: 'И.И Петрова'
                },
                {
                    time: '10:10-11:40',
                    nameOfDiscipline: 'Русский язык',
                    groupNumber: '11-505',
                    teacherName: 'К.У Семёнов'
                },
                {
                    time: '11:50-13:20',
                    nameOfDiscipline: 'Информатика',
                    groupNumber: '11-004',
                    teacherName: 'А.А Иванов'
                }
            ]
        };

    }

    render() {


        function CurrentPair(index) {
            if (index + 2 === 2) {
                return "Номер пары";
            }
            return index;
        }

        const content = this.state.classes.map(
            (ourClass, index) =>
                <Row key={index} className="brdClass">
                    <Col className="brdColClass">{CurrentPair(index)}</Col>
                    <Col className="brdColClass">{ourClass.time}</Col>
                    <Col className="brdColClass">{ourClass.groupNumber}</Col>
                    <Col className="brdColClass">{ourClass.nameOfDiscipline}</Col>
                    <Col>{ourClass.teacherName}</Col>
                </Row>
        );

        return (
            <div>
                {content}
            </div>
            //сделать динамический вывод всех элементов массива через .map
        );
    }
}
