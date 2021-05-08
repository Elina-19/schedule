import React, {Component} from 'react';
import './DailySchedule.css';
import Service from '../../httpRequest/schedule';
import {fetchAudience} from '../../actions/actions'
import {connect} from "react-redux";


export class DailySchedule extends Component {
    static displayName = DailySchedule.name;

    componentDidMount() {
        const {dispatch, match:{params: audienceId}} = this.props;
        dispatch(fetchAudience(audienceId));
    }

    state = {
        classes: []
    };

    service = new Service();

    constructor() {
        super();
        this.updateClass();
    }

    onClassLoaded = (classes) => {
        this.setState({classes});
    };

    updateClass() {
        const id = this.service._extractClass(window.location.href);
        this.service
            .getAllClasses(id)
            .then(this.onClassLoaded);
    }

    render() {
        const {isFetching} = this.props.status;
        const {classData} = this.props.ourClass;

        const content = this.state.classes.map(
            (ourClass, index) =>
                <tr key={index}>
                    <th>{index+1}</th>
                    <th>{ourClass.time}</th>
                    <th>{ourClass.groups}</th>
                    <th>{ourClass.name}</th>
                    <th>{ourClass.teacher}</th>
                </tr>
        );

        return (
            <table className="tableR">
                <thead>
                <tr>
                    <th></th>
                    <th>Время</th>
                    <th>Группа</th>
                    <th>Название предмета</th>
                    <th>Имя преподавателя</th>
                </tr>
                </thead>
                <tbody>
                {content}
                </tbody>
            </table>
        );
    }
}
const mapStateToProps = ({DailySchedule, status}) => {return {DailySchedule, status}};

export default connect(mapStateToProps)(DailySchedule)
