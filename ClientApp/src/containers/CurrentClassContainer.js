import React from 'react';
import { connect } from "react-redux";

import { fetchAudience } from "../actions/actions";
import { bindActionCreators } from "redux";
import CurrentClass from "../components/CurrentClass/CurrentClass";

class CurrentClassContainer extends Component {

    componentDidMount() {
        this.getAudience();
    }

    getAudience = (audienceId) => {
        const { fetchAudience } = this.props;
        fetchAudience(audienceId);
    };

    render() {
        const { isFetching } = this.props.status;
        const { number, name, groups, teacher, time } = this.props;

        return <CurrentClass number={number}
            name={name}
            groups={groups}
            teacher={teacher}
            time={time}
            isFetching={isFetching}
            onPageChange={this.getAudience} />
    }
}

const mapStateToProps = ({ number, name, groups, teacher, time, status }) => {

    return {
        number,
        name,
        groups,
        teacher,
        time,
        status
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchAudience
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentClassContainer)