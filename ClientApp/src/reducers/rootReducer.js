
import dailyScheduleReducer from './dailyScheduleReducer';
import floorScheduleReducer from './floorScheduleReducer';
import switchDayReducer from './switchDayReducer';
import currentClassReducer from './currentClassReducer';
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    dailyScheduleReducer,
    floorScheduleReducer,
    switchDayReducer,
    currentClassReducer
});

export default rootReducer;