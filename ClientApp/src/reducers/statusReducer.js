import * as Actions from '../actions/actions';

const statusState = {
    isFetching: true
}

function statusReducer(state = statusState, action) {

    switch (action.type) {
        case Actions.REQUEST_DATA:
            return {...state, isFetching: true};

        case Actions.RECEIVE_RESPONSE:
            return {...state, isFetching: false};

        default:
            return state;
    }
}

export default statusReducer;