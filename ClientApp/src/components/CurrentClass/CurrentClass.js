import React, {Component} from 'react';
import './CurrentClass.css';
import Service from '../../httpRequest/schedule';

export class CurrentClass extends Component {

    static displayName = CurrentClass.name;

    service = new Service();

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
        const id = this.service._extractClass(window.location.href) + index;
        this.service
            .getClass(id)
            .then(this.onClassLoaded);
    }

    render() {

        const {
            currentClass: {
                number,
                name,
                groups,
                teacher,
                time
            }
        } = this.state;


        return (
            <div className="currentClassDiscipline">

                <div className="currentClassInfo">
                    <div className="currentClassNumber">
                        {number}
                    </div>
                    <div  className="currentClassName">{name}</div>
                    <div  className="currentClassGroups">{groups}</div>
                    <div className="currentClassTeacher">{teacher}</div>
                </div>
                <div className="currentClassTimes">
                <div className="currentClassTime">
                    {time}
                </div>
                    <img className="currentClassTimeRange" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANIAAAALCAYAAAAKqNOlAAAAaklEQVRoQ+3TsRGAMAwEQatIGJFRgxpyqVCEP1zn/mBHVz39Lo8AgSOBuuf5jhZ8JkBgCckREAgICCmAaIKAkNwAgYCAkAKIJggIyQ0QCAgIKYBogoCQ3ACBgICQAogmCNQ1vTEQIHAm8AMEiRZsJUT99AAAAABJRU5ErkJggg=="/>
                    <div className="currentClassStart">
                        Осталось 19 мин
                    </div>
                </div>
            </div>
        );
    }
}
