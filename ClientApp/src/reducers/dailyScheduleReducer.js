import * as Actions from '../actions/actions';

const dailyScheduleState = {
    classes: [],
};

function dailyScheduleReducer(state = dailyScheduleState, action) {

    switch (action.type) {
        case Actions.RECEIVE_DAILY_SCHEDULE:
            return { ...state, classes: action.dailySchedule };
        default:
            return state;
    }
}

export default dailyScheduleReducer;