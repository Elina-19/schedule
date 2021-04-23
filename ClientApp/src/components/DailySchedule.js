import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import '../custom.css';

export class DailySchedule extends Component {
    static displayName = DailySchedule.name;

    constructor(props) {
        super(props);


        var today = new Date(),
            time =  today.toLocaleTimeString(),
            day = today.getDay(),
            month = today.getMonth();

        this.state = {
            time: time,
            day: day,
            month: month,
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



    currentDay() {
        switch (this.state.day) {
            case (1):
                return 'понедельник';
            case (2):
                return 'вторник';
            case (3):
                return 'среда';
            case (4):
                return 'четверг';
            case (5):
                return ('пятница');
            case (6):
                return ('суббота');
            case (7):
                return ('воскресенье');
            default:
                return ('');
        }
    }



    currentMonth() {
        switch (this.state.month) {
            case (0):
                return 'января';
            case (1):
                return 'февраля';
            case (2):
                return 'марта';
            case (3):
                return 'апреля';
            case (4):
                return ('мая');
            case (5):
                return ('июня');
            case (6):
                return ('июля');
            case (7):
                return ('августа');
            case (8):
                return ('сентября');
            case (9):
                return ('октября');
            case (10):
                return ('ноября');
            case (11):
                return ('декабря');

            default:
                return ('');
        }
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
                <div className="dailyScheduleMain">
                    <div>
                        <button className="dailyScheduleButton">←</button>
                    </div>
                    <div><p  className="dailyScheduleP">{this.state.day} {this.currentMonth()}, {this.currentDay()}</p>
                    </div>
                    <div>
                        <button className="dailyScheduleButton">→</button>
                    </div>
                </div>
                {content}
            </div>
            //сделать динамический вывод всех элементов массива через .map
        );
    }
}
