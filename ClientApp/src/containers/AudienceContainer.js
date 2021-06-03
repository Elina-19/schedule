import React, {Component} from 'react';
import { connect } from "react-redux";

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
            return 1301;
        }
    }
    
    render() {
        const { isFetching } = this.props.status;
        const { audience } = this.props;
        
        if (!isFetching){
            if (audience != null)
                return <Audience currentClass={audience} />
            else
                return (<h2>Oops, page not found</h2>);
        }
        else
            return (<h2>Hi</h2>);
    }
}

const mapStateToProps = ({ audience, status }) => {

    return {
        audience,
        status
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchAudience
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AudienceContainer)