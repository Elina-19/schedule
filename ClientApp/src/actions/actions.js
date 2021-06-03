import Schedule from "../httpRequest/schedule";

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_RESPONSE = 'RECEIVE_RESPONSE';
export const ERROR_RESPONSE = 'ERROR_RESPONSE';

export const INCREMENT_DAILY_SCHEDULE = 'INCREMENT_DAILY_SCHEDULE';
export const DECREMENT_DAILY_SCHEDULE = 'DECREMENT_DAILY_SCHEDULE';

export const INCREMENT_FLOOR_SCHEDULE = 'INCREMENT_FLOOR_SCHEDULE';
export const DECREMENT_FLOOR_SCHEDULE = 'DECREMENT_FLOOR_SCHEDULE';

export const INCREMENT_SWITCH_DAY = 'INCREMENT_SWITCH_DAY';
export const DECREMENT_SWITCH_DAY = 'DECREMENT_SWITCH_DAY';

export const RECEIVE_AUDIENCES = 'RECEIVE_AUDIENCES';
export const RECEIVE_AUDIENCE = 'RECEIVE_AUDIENCE';

export const RECEIVE_FLOORS = 'RECEIVE_FLOORS';
export const RECEIVE_FLOOR = 'RECEIVE_FLOOR';
export const RECEIVE_DAILY_SCHEDULE = 'RECEIVE_DAILY_SCHEDULE';

const scheduleService = new Schedule();

// Устанавливает состояние, что данные запрошены
function requestData() {
    return {
        type: REQUEST_DATA
    }
}

// Устанавливает состояние, что данные получены
function handleResponse() {
    return {
        type: RECEIVE_RESPONSE
    }
}

// Устанавливает состояние, что вернулась ошибка
function handleError() {
    return {
        type: ERROR_RESPONSE
    }
}

function receiveAudience(audience) {
    return {
        type: RECEIVE_AUDIENCE,
        audience: audience
    }
}

function receiveFloor(floor){
    return {
        type: RECEIVE_FLOOR,
        floor: floor
    }
}

function receiveDailySchedule(dailySchedule){
    return {
        type: RECEIVE_DAILY_SCHEDULE,
        dailySchedule: dailySchedule
    }
}

function incrementDailyShedule(classes) {
    return {
        type: INCREMENT_DAILY_SCHEDULE,
        classes,
    }
}

function decrementDailyShedule(classes) {
    return {
        type: DECREMENT_DAILY_SCHEDULE,
        classes,
    }
}

function incrementFloorShedule(audiences) {
    return {
        type: INCREMENT_FLOOR_SCHEDULE,
        audiences,
    }
}

function decrementFloorShedule(audiences) {
    return {
        type: DECREMENT_FLOOR_SCHEDULE,
        audiences,
    }
}

function incrementSwitchDay(currentDate) {
    return {
        type: INCREMENT_SWITCH_DAY,
        currentDate,
    }
}

function decrementSwitchDay(currentDate) {
    return {
        type: INCREMENT_SWITCH_DAY,
        currentDate,
    }
}


export function fetchFloor(floorId) {
    return function (dispatch) {
        // TODO - добавить в сервис метод для запроса инфы по этажу
        const floor = response(scheduleService.getClass(floorId), dispatch);

        return floor.then(floor => {
            const mappedFloor = {
                time: floor.data.floor.time,
                groups: floor.data.floor.groups,
                name: floor.data.floor.name,
                teacher: floor.data.floor.teacher
            };
            dispatch(receiveFloor(mappedFloor))
        });
    }
}


export function fetchAudience(audienceId) {
    return function (dispatch) {

        const audience = response(scheduleService.getClass(audienceId), dispatch);
        // TODO - заменить на свойства аудитории

        return audience.then(audience => {

            const mappedAudience = {
                
                number: audience.number,
                name: audience.name,
                groups: audience.groups,
                teacher: audience.teacher,
                time: audience.time
            };
            dispatch(receiveAudience(mappedAudience));
        });
    }
}

export function fetchDailySchedule(dailyScheduleId) {
    return function (dispatch) {
        console.log(dailyScheduleId)
        const dailySchedule = response(scheduleService.getAllClasses(dailyScheduleId), dispatch);
        // TODO - заменить на свойства аудитории
        return dailySchedule.then(dailySchedule => {
            dispatch(receiveDailySchedule(dailySchedule));//тоже готовые данные?
        });
    }
}

/*
* Helper functions
* */
function response(promise, dispatch) {

    dispatch(requestData());

    return promise
        .then(data => {
            dispatch(handleResponse());
            return data
        })
        .catch(() => {
            dispatch(handleError());
        })
}
