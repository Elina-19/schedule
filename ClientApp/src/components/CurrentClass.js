import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import '../custom.css';

export class CurrentClass extends Component {
    static displayName = CurrentClass.name;



    constructor(props) {
        super(props);
        this.state = {
            class: {
                    time: '8:30-10:00',
                    nameOfDiscipline: 'Англ. яз',
                    groupNumber: '11-905',
                    teacherName: 'И.И Петрова'
                //добавить ещё данных, img
                }
        };

    }

    render () {
        return (
            <Row>
                <Col>Информация </Col>
                <Col>Изображение</Col>

            </Row>
        );
    }
}
