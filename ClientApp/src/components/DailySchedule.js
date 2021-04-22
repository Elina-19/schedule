import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import '../custom.css';

export class DailySchedule extends Component {
    static displayName = DailySchedule.name;

    constructor(props) {
        super(props);
        this.state = {

            classes: [
                {
                    time: '8:30-10:00',
                    nameOfDiscipline: 'Англ. яз',
                    groupNumber: '11-905',
                    teacherName: 'И.И Петрова'
                },
                {
                    time: '10:10-11:40',
                    nameOfDiscipline: 'Англ. яз',
                    groupNumber: '11-905',
                    teacherName: 'И.И Петрова'
                },
                {
                    time: '11:50-13:20',
                    nameOfDiscipline: 'Англ. яз',
                    groupNumber: '11-905',
                    teacherName: 'И.И Петрова'
                }
            ]

        };

    }



    render () {
        return (
            <Row>
                <Col sm="1">1</Col>
                <Col>8:30-10:00</Col>
                <Col>Англ. яз</Col>
                <Col>11-905</Col>
                <Col>И.И Петрова</Col>
            </Row>
                //сделать динамический вывод всех элементов массива через .map
        );
    }
}
