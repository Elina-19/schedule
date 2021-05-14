import * as Actions from '../actions/actions';

const dailyScheduleState = {
    classes: [],
};

function dailyScheduleReducer(state = dailyScheduleState, action) {

    switch (action.type) {
        case Actions.INCREMENT_DAILY_SCHEDULE:
            return {...state, classes: action.classes };

        case Actions.DECREMENT_DAILY_SCHEDULE:
            return {...state, classes: action.classes };

        default:
            return state;
    }
}

export default dailyScheduleReducer;