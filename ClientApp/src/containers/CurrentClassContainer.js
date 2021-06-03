import React, {Component} from 'react';
import { connect } from "react-redux";

import { fetchAudience } from "../actions/actions";
import {CurrentClass} from "../components/CurrentClass/CurrentClass";

class CurrentClassContainer extends Component {

    componentDidMount() {
        const { dispatch, audienceId } = this.props;
        dispatch(fetchAudience(audienceId));
        console.log(this.props);
    }

    render() {
        // const { isFetching } = this.props.status;
        // const { currentClass } = this.props.currentClassData;

        var currentClass = null;
        
        return <CurrentClass currentClass={currentClass} />
    }
}

const mapStateToProps = ({ currentClassData, status }) => {

    return {
        currentClassData,
        status
    };
};

export default connect(mapStateToProps)(CurrentClassContainer)