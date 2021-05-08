import * as actions from '../actions/actions';

const dailyScheduleState = {
    classes: [],
};

function dailyScheduleReducer(state = dailyScheduleState, action) {

    switch (action.type) {
        case actions.INCREMENT_DAILY_SCHEDULE:
            return {...state, classes: action.classes };

        case actions.DECREMENT_DAILY_SCHEDULE:
            return {...state, classes: action.classes };

        default:
            return state;
    }
}

export default dailyScheduleReducer;