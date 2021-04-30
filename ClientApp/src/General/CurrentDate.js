export default class CurrentDate {

    currentDayOfWeek() {
        const today = new Date();
        return today.getDay();
    }

    currentMonth() {
        const today = new Date();
        return today.getMonth();
    }

}


