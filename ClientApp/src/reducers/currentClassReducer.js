﻿import * as Actions from '../actions/actions';

const currentClassState = {
    currentClass: {}
};

function currentClassData(state = currentClassState, action) {

    switch (action.type) {
        case Actions.RECEIVE_AUDIENCE:
            return {
                ...state,
                currentClass: action.currentClass
            };
        default:
            return state;
    }
}

export default currentClassData;