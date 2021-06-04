import React, {Component} from 'react';
import { connect } from "react-redux";
import './load.css';

import { fetchAudience } from "../actions/actions";
import {bindActionCreators} from "redux";
import Audience from "../components/Audience/Audience";

class AudienceContainer extends Component {

    componentDidMount() {
        const { fetchAudience, audienceId } = this.props;
        fetchAudience(this.transformAudience());
    }

    transformAudience(){
        try {
            const idRegExp = /\/([0-9]*)\/$/;
            return window.location.href.match(idRegExp)[1];
        } catch (error) {
            return 1201;
        }
    }

    render() {
        const { isFetching } = this.props.status;
        const { currentClass } = this.props;

        if (!isFetching){
            if (currentClass.currentClass != null)
                return <Audience currentClass={currentClass.currentClass} />
            else
                return (<h2>Oops, page not found</h2>);
        }
        else
            return <div className="load">Loading
        
                    </div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(AudienceContainer)
