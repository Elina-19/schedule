import * as Actions from '../actions/actions';

const floorScheduleState = {
    audiences: [],
};

function floorScheduleReducer(state = floorScheduleState, action) {

    switch (action.type) {
        case Actions.INCREMENT_FLOOR_SCHEDULE:
            return {...state, audiences: action.audiences};

        case Actions.DECREMENT_FLOOR_SCHEDULE:
            return {...state, audiences: action.audiences};

        default:
            return state;
    }
}

export default floorScheduleReducer;