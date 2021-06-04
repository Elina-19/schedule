import React, {Component} from 'react';
import { connect } from "react-redux";
import './load.css';

import { fetchFloor } from "../actions/actions";
import {bindActionCreators} from "redux";
import Floor from "../components/Floor/Floor";

class FloorContainer extends Component {

    componentDidMount() {
        const { fetchFloor, floorId } = this.props;
        fetchFloor(this.transformFloor());
    }

    transformFloor(){
        try {
            const idRegExp = /\/([0-9]*)\/$/;
            return window.location.href.match(idRegExp)[1];
        } catch (error) {
            return 1301;
        }
    }

    render() {
        const { isFetching } = this.props.status;
        const { floorSchedule } = this.props;
        console.log(this.props)

        if (!isFetching){
            if (floorSchedule.audiences != null)
                return <Floor currentClass={floorSchedule.audiences} />
            else
                return (<h2>Oops, page not found</h2>);
        }
        else
            return <div className="load">Loading</div>;
    }
}

const mapStateToProps = ({ floorSchedule, status }) => {

    return {
        floorSchedule,
        status
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchFloor
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FloorContainer)
