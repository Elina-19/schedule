import React from 'react';
import { connect } from "react-redux";

import { fetchDailySchedule } from "../actions/actions";
import { bindActionCreators } from "redux";
import DailySchedule from "../components/DailySchedule/DailySchedule";

class DailyScheduleContainer extends Component {

    componentDidMount() {
        this.getDailySchedule();
    }

    getDailySchedule = (dailyScheduleId) => {
        const { fetchDailySchedule } = this.props;
        fetchDailySchedule(dailyScheduleId);
    };

    render() {
        const { isFetching } = this.props.status;
        const { classes } = this.props;

        return <DailySchedule classes={classes}
            isFetching={isFetching}
        />
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
        fetchAudience
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyScheduleContainer)