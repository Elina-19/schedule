import React from 'react';
import { connect } from "react-redux";

import { fetchAudience } from "../actions/actions";
import { bindActionCreators } from "redux";
import CurrentClass from "../components/CurrentClass/CurrentClass";

class CurrentClassContainer extends Component {

    componentDidMount() {
        const { dispatch, match: { params: audienceId } } = this.props;
        dispatch(fetchAudience(audienceId.audienceId));
    }

    render() {
        const { isFetching } = this.props.status;
        const { currentClass } = this.props.currentClassData;

        return <CurrentClass currentClass={currentClass} />
    }
}

const mapStateToProps = ({ currentClassData, status }) => {

    return {
        currentClassData,
        status
    }
};

export default connect(mapStateToProps)(CurrentClassContainer)