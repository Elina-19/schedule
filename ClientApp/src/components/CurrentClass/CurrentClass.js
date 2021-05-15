import React, {Component} from 'react';
import {connect} from "react-redux";
import './CurrentClass.css';

export class CurrentClass extends Component {

    // componentDidMount() {
    //     const {dispatch, match: {params: audienceId}} = this.props;
    //     dispatch(fetchAudience(audienceId));
    // }

    render() {

        const { currentClass } = this.props;
       
        const { number, name, groups, teacher, time } = currentClass;

        return (
            <div className="currentClassDiscipline">

                <div className="currentClassInfo">
                    <div className="currentClassNumber">
                        {number}
                    </div>
                    <div  className="currentClassName">{name}</div>
                    
                    {console.log(Array.isArray(groups))}
                    {console.log(groups)}

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

// const mapStateToProps = ({currentClass, status}) => {return {currentClass, status}};
//
// export default connect(mapStateToProps)(CurrentClass)
