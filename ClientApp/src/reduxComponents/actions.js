import Schedule from "../httpRequest/schedule";

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_RESPONSE = 'RECEIVE_RESPONSE';
export const ERROR_RESPONSE = 'ERROR_RESPONSE';

export const INCREMEMT_DAILY_SCHEDULE = 'INCREMEMT_DAILY_SCHEDULE';
export const DECREMEMT_DAILY_SCHEDULE = 'DECREMEMT_DAILY_SCHEDULE';

export const INCREMEMT_FLOOR_SCHEDULE = 'INCREMEMT_FLOOR_SCHEDULE';
export const DECREMEMT_FLOOR_SCHEDULE = 'DECREMEMT_FLOOR_SCHEDULE';

export const INCREMEMT_SWITCH_DAY = 'INCREMEMT_SWITCH_DAY';
export const DECREMEMT_SWITCH_DAY = 'DECREMEMT_SWITCH_DAY';

export const RECEIVE_AUDIENCES = 'RECEIVE_AUDIENCES';
export const RECEIVE_AUDIENCE = 'RECEIVE_AUDIENCE';

export const RECEIVE_FLOORS = 'RECEIVE_FLOORS';
export const RECEIVE_FLOOR = 'RECEIVE_FLOOR';

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
        post: audience
    }
}

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

export function fetchAudience(audienceId) {
    return function (dispatch) {

        const audience = response(scheduleService.getClass(audienceId), dispatch);

        // TODO - заменить на свойства аудитории
        return post.then(post => {

            const mappedPost = {
                id: post.data.post.id,
                postTitle: post.data.post.postTitle,
                postText: post.data.post.postText,
                postAuthor: post.data.post.postAuthor,
                authorId: post.data.post.authorId
            };
            dispatch(receiveAudience(mappedPost));
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