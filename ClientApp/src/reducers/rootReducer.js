
import dailyScheduleReducer from './dailyScheduleReducer';
import floorScheduleReducer from './floorScheduleReducer';
import switchDayReducer from './switchDayReducer';
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    dailyScheduleReducer,
    floorScheduleReducer,
    switchDayReducer,
});

export default rootReducer;