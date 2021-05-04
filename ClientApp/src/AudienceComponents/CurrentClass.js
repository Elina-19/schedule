import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import './css/CurrentClass.css';
import ApiService from '../Api/ApiService';

export class CurrentClass extends Component {

    static displayName = CurrentClass.name;

    apiService = new ApiService();

    state = {
        currentClass: {}
    };

    constructor() {
        super();
        this.updateClass("");
    }

    onClassLoaded = (currentClass) => {
        this.setState({currentClass});
    };

    updateClass(index) {
        const id = this.apiService._extractClass(window.location.href) + index ;
        this.apiService
            .getClass(id)
            .then(this.onClassLoaded);
    }

    render() {

        const {
            currentClass: {
                time,
                nameOfDiscipline,
                groupNumber,
                teacherName,
                classType,
                img,
                idClass
            }
        } = this.state;


        return (
            <div className="currentClass">
                <div className="currentClassInform">

                    <p className="currentClassP">{groupNumber}</p>
                    <p className="currentClassP">{nameOfDiscipline}</p>

                    <Row>
                        <Col min-width="200px">Статус:</Col>
                        <Col>
                            <p className="currentClassP">{time}</p>
                            <p className="currentClassP">{classType}</p>
                            <p className="currentClassP">{teacherName}</p>
                            <p className="currentClassP">{idClass}</p>

                        </Col>
                    </Row>

                </div>

                <div className="imageClass">
                    <img src={`https://starwars-visualguide.com/assets/img/planets/${img}.jpg`} width="300px" alt="Audience image"/>
                </div>

            </div>
        );
    }
}
