/*
import React, {Component} from 'react';
import { connect } from "react-redux";

import { fetchAudience } from "../actions/actions";
import {CurrentClass} from "../components/CurrentClass/CurrentClass";
import {bindActionCreators} from "redux";

class CurrentClassContainer extends Component {

    componentDidMount() {
        const { fetchAudience, audienceId } = this.props;
        fetchAudience(audienceId);
    }

    render() {
        const { isFetching } = this.props.status;
        const { currentClass } = this.props.currentClass;
        
        if (!isFetching){
            if (currentClass != null)
                return <CurrentClass currentClass={currentClass} />
            else
                return (<h2>Oops, page not found</h2>);
        }
        else
            return (<h2>Hi</h2>);
    }
}

const mapStateToProps = ({ currentClass, status }) => {

    return {
        currentClass,
        status
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchAudience
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentClassContainer)*/
