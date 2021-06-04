import React, {Component} from 'react';
import {connect} from "react-redux";
import './CurrentClass.css';

export class CurrentClass extends Component {
    
    render() {
        console.log(this.props);
        const { audienceNumber, discipline, groups, teacher, time } = this.props.currentLesson;
        return (
            <div className="currentClassDiscipline">

                <div className="currentClassInfo">
                    <div className="currentClassNumber">
                        {audienceNumber}
                    </div>
                    <div  className="currentClassName">{discipline}</div>
                   
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