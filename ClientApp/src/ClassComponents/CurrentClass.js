import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import './css/CurrentClass.css';

export class CurrentClass extends Component {
    static displayName = CurrentClass.name;

    constructor(props) {
        super(props);

        this.state = {

            class: {
                time: '8:30-10:00',
                nameOfDiscipline: 'Английский язык',
                groupNumber: '11-905',
                teacherName: 'И.И Петрова',
                classType: "Практика",
                img: "http://www.yugopolis.ru/data/img/9fdbb17a1618e5e672ac584e99c45127/310672.jpg",
                idClass:1310
            }
        };
    }
    render() {
        return (
            <div className="currentClass">

                <div className="currentClassInform">

                    <p className="currentClassP">{this.state.class.groupNumber}</p>
                    <p className="currentClassP">{this.state.class.nameOfDiscipline}</p>

                    <Row >
                        <Col min-width="200px">Статус:</Col>
                        <Col>
                            <p className="currentClassP">{this.state.class.time}</p>
                            <p className="currentClassP">{this.state.class.classType}</p>
                            <p className="currentClassP">{this.state.class.teacherName}</p>
                            <p className="currentClassP">{this.state.class.idClass}</p>

                        </Col>
                    </Row>

                </div>

                <div className="imageClass">
                    <img src={this.state.class.img} width="300px" alt="sdv"/>
                </div>

            </div>

        );
    }
}
