import * as Actions from '../actions/actions';

const switchDayState = {
    currentDate = new CurrentDate();
};

function switchDayReducer(state = switchDayState, action) {

    switch (action.type) {
        case Actions.INCREMENT_SWITCH_DAY:
            return {...state, currentDate: action.currentDate};

        case Actions.DECREMENT_SWITCH_DAY:
            return {...state, currentDate: action.currentDate};

        default:
            return state;
    }
}

export default switchDayReducer;