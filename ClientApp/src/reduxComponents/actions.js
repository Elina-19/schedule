export const INCREMEMT_DAILY_SCHEDULE = 'INCREMEMT_DAILY_SCHEDULE';
export const DECREMEMT_DAILY_SCHEDULE = 'DECREMEMT_DAILY_SCHEDULE';

export const INCREMEMT_FLOOR_SCHEDULE = 'INCREMEMT_FLOOR_SCHEDULE';
export const DECREMEMT_FLOOR_SCHEDULE = 'DECREMEMT_FLOOR_SCHEDULE';

export const INCREMEMT_SWITCH_DAY = 'INCREMEMT_SWITCH_DAY';
export const DECREMEMT_SWITCH_DAY = 'DECREMEMT_SWITCH_DAY';

function incrementDailyShedule(classes) {
    return {
        type: INCREMEMT_DAILY_SCHEDULE,
        classes,
    }
}

function decrementDailyShedule(classes) {
    return {
        type: DECREMEMT_DAILY_SCHEDULE,
        classes,
    }
}

function incrementFloorShedule(audiences) {
    return {
        type: INCREMEMT_FLOOR_SCHEDULE,
        audiences,
    }
}

function decrementFloorShedule(audiences) {
    return {
        type: DECREMEMT_FLOOR_SCHEDULE,
        audiences,
    }
}

function incrementSwitchDay(currentDate) {
    return {
        type: INCREMEMT_SWITCH_DAY,
        currentDate,
    }
}

function decrementSwitchDay(currentDate) {
    return {
        type: INCREMEMT_SWITCH_DAY,
        currentDate,
    }
}