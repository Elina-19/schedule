import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import '../custom.css';

export class FloorSchedule extends Component {
    static displayName = FloorSchedule.name;

    constructor(props) {
        super(props);

        this.state = {
            classes: [
                {
                    numberOfCLass: '№ аудитории',
                    listOfPairs: [
                        {
                            nameOfDiscipline: 'Название предмета',
                            teacherName: 'Имя преподавателя',
                            groupNumber: 'Группа',
                            time: 'Время',
                        }
                    ]
                },
                {
                    numberOfAudi: '1301',
                    listOfPairs: [
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
                }
            ]
        };

    }

    render() {

        const content = this.state.audis.map(
            (ourClass, index) =>
                <Row key={index} className="brdClass">
                    <Col className="brdColClass">{ourClass.numberOfAudi}</Col>
                    <Col className="brdColClass">
                        {ourClass.listOfPairs.map(
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
