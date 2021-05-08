import React, {Component} from 'react';
import {connect} from "react-redux";

import './CurrentClass.css';
import {fetchAudience} from "../../reduxComponents/actions";

export class CurrentClass extends Component {

    componentDidMount() {
        const {dispatch, match: {params: audienceId}} = this.props;
        dispatch(fetchAudience(audienceId));

        console.log("ComponentDidMount Result is ", this.props);
    }

    render() {
        const {isFetching} = this.props.status;
        const {classData} = this.props.currentClass;

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

const mapStateToProps = ({currentClass, status}) => {return {currentClass, status}};

export default connect(mapStateToProps)(CurrentClass)
