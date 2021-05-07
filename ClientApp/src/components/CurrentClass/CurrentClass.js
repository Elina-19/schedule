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





        return (
            <div className="currentClassDiscipline">

                <div className="currentClassInfo">
                    <div className="currentClassNumber">
                        {this.state.currentClass.number}
                    </div>
                    <div  className="currentClassName">{this.state.currentClass.name}</div>
                    
                    {console.log(Array.isArray(this.state.currentClass.groups))}
                    {console.log(this.state.currentClass.groups)}

                    <div  className="currentClassGroups">{this.state.currentClass.groups}</div>
                    <div className="currentClassTeacher">{this.state.currentClass.teacher}</div>
                </div>
                <div className="currentClassTimes">
                <div className="currentClassTime">
                    {this.state.currentClass.time}
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
