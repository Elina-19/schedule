import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import './css/DailySchedule.css';
import ApiService from '../Api/ApiService';


export class DailySchedule extends Component {
    static displayName = DailySchedule.name;

    state = {
        classes: []
    };

    apiService = new ApiService();

    constructor() {
        super();
        this.updateClass();
    }

    onClassLoaded = (classes) => {
        this.setState({classes});
    };

    updateClass() {
        this.apiService
            .getAllClasses()
            .then(this.onClassLoaded);
    }


    render() {
        const content = this.state.classes.map(
            (ourClass, index) =>
                <Row key={index} className="brdClass">
                    <Col className="brdColClass">{index+1}</Col>

                    <Col className="brdColClass">{ourClass.time}</Col>
                    <Col className="brdColClass">{ourClass.groupNumber}</Col>
                    <Col className="brdColClass">{ourClass.nameOfDiscipline}</Col>
                    <Col>{ourClass.teacherName}</Col>
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
