import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import actions from './actions';

const store = createStore(rootReducer, applyMiddleware(thunk))