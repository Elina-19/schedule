import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import actions from './actions';

export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunkMiddleware)
    )
}

// store.dispatch(incrementFloorSchedule(audiences));
// store.getState().audiences;
