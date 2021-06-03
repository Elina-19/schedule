import dailyScheduleReducer from './dailyScheduleReducer';
import floorScheduleReducer from './floorScheduleReducer';
import switchDayReducer from './switchDayReducer';
import currentClassReducer from './currentClassReducer';
import statusReducer from "./statusReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    dailySchedule: dailyScheduleReducer,
    floorSchedule: floorScheduleReducer,
    switchDay: switchDayReducer,
    currentClass: currentClassReducer,
    status: statusReducer
});

export default rootReducer;