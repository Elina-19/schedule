import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import '../custom.css';

export class FloorSchedule extends Component {
    static displayName = FloorSchedule.name;

    constructor(props) {
        super(props);

        this.state = {
            audiences: [
                {
                    numberOfAudience: '№ аудитории',
                    listOfClasses: [
                        {
                            nameOfDiscipline: 'Название предмета',
                            teacherName: 'Имя преподавателя',
                            groupNumber: 'Группа',
                            time: 'Время',
                        }
                    ]
                },
                {
                    numberOfAudience: '1301',
                    listOfClasses: [
                        {
                            nameOfDiscipline: 'Алгем',
                            teacherName: 'Арсланов',
                            groupNumber: '11-001',
                            time: '8:30-10:00',
                        },
                        {
                            nameOfDiscipline: 'Мат анализ',
                            teacherName: 'Широкова',
                            groupNumber: '11-004',
                            time: '10:10-11:40',
                        },
                    ]
                },
                {
                    numberOfAudience: '1302',
                    listOfClasses: [
                        {
                            nameOfDiscipline: 'Алгем',
                            teacherName: 'Тапкин',
                            groupNumber: '11-001',
                            time: '8:30-10:00',
                        },
                        {
                            nameOfDiscipline: 'Информатика',
                            teacherName: 'Ференец',
                            groupNumber: '11-906',
                            time: '10:10-11:40',
                        }
                    ]
                },
                {
                    numberOfAudience: '1303',
                    listOfClasses: [
                        {
                            nameOfDiscipline: 'Русский язык',
                            teacherName: 'Гараева',
                            groupNumber: '11-003',
                            time: '8:30-10:00',
                        },
                        {
                            nameOfDiscipline: 'Дискретная математика',
                            teacherName: 'Зубков',
                            groupNumber: '11-002',
                            time: '10:10-11:40',
                        }
                    ]
                }
            ]
        };

    }

    render() {

        const content = this.state.audiences.map(
            (ourClass, index) =>
                <Row key={index} className="brdClass">
                    <Col className="brdColClass">{ourClass.numberOfAudience}</Col>
                    <Col className="brdColClass">
                        {ourClass.listOfClasses.map(
                            (ourClass) =>
                                <Row className="brdClass">
                                    <Col className="brdColClass">{ourClass.nameOfDiscipline}</Col>
                                    <Col className="brdColClass">{ourClass.teacherName}</Col>
                                    <Col className="brdColClass">{ourClass.groupNumber}</Col>
                                    <Col className="brdColClass">{ourClass.time}</Col>
                                </Row>
                        )}
                    </Col>
                </Row>
        );

        return (
            <div>
                {content}
            </div>
        );
    }
}
