import React, {Component} from 'react';
import { connect } from "react-redux";

import { fetchDailySchedule } from "../actions/actions";
import { bindActionCreators } from "redux";
import {DailySchedule} from "../components/DailySchedule/DailySchedule";

class DailyScheduleContainer extends Component {

    componentDidMount() {
        const { fetchDailySchedule, dailyScheduleId } = this.props.dailySchedule;
        fetchDailySchedule(dailyScheduleId);
    }
    
    render() {
        const { isFetching } = this.props.status;
        const { classes } = this.props;
        console.log(this.props);
        if (!isFetching) {
            if (classes != null)
                return <DailySchedule currentClass={classes} />
            else
                return (<h2>Oops, page not found</h2>);
        }
        else
            return (<h2>Hi</h2>);
    }
}

const mapStateToProps = ({ classes, status }) => {

    return {
        classes,
        status
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchDailySchedule
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyScheduleContainer)