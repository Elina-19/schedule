import React, {Component} from 'react';
import {connect} from "react-redux";
import './CurrentClass.css';

export class CurrentClass extends Component {
    
    render() {

        // const { currentClass } = this.props;
       
        // const { number, name, groups, teacher, time } = currentClass;

        return (
            <div className="currentClassDiscipline">

                <div className="currentClassInfo">
                    <div className="currentClassNumber">
                        9999
                    </div>
                    <div  className="currentClassName">Foo</div>
                    
                    {/*{console.log(Array.isArray(groups))}*/}
                    {/*{console.log(groups)}*/}

                    <div  className="currentClassGroups">11-022</div>
                    <div className="currentClassTeacher">Lorem Ipsum</div>
                </div>
                <div className="currentClassTimes">
                <div className="currentClassTime">
                    23:59:59
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