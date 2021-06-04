import * as Actions from '../actions/actions';

const floorState = {
    audiences: null
};

function floorData(state = floorState, action) {

    switch (action.type) {
        case Actions.RECEIVE_FLOOR:
            return {
                
                ...state,
                audiences: action
            };
        default:
            return state;
    }
}

export default floorData;
