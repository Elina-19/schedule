import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import './css/DailySchedule.css';
import Service from '../httpRequest/schedule';


export class DailySchedule extends Component {
    static displayName = DailySchedule.name;

    state = {
        classes: []
    };

    service = new Service();

    constructor() {
        super();
        this.updateClass();
    }

    onClassLoaded = (classes) => {
        this.setState({classes});
    };

    updateClass() {
        this.service
            .getAllClasses()
            .then(this.onClassLoaded);
    }


    render() {
        const content = this.state.classes.map(
            (ourClass, index) =>
                <Row key={index} className="brdClass">
                    <Col className="brdColClass">{index+1}</Col>

                    <Col className="brdColClass">{ourClass.time}</Col>
                    <Col className="brdColClass">{ourClass.groups}</Col>
                    <Col className="brdColClass">{ourClass.name}</Col>
                    <Col>{ourClass.teacher}</Col>
                </Row>
        );

        return (
            <div>
                <Row  className="brdClass">
                    <Col className="brdColClass">Номер пары</Col>

                    <Col className="brdColClass">Время</Col>
                    <Col className="brdColClass">Группа</Col>
                    <Col className="brdColClass">Название предмета</Col>
                    <Col>Имя преподавателя</Col>
                </Row>
                {content}
            </div>
        );
    }
}
