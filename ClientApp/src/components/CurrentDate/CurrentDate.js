export default class CurrentDate {

    /*
    * Небольшие советы для написания хорошего кода.
    * 
    * Обычно методы - это выполнение какого-то действия
    * И связи с этим, в именах метотодов используют глаголы
    * Например, GetCurrentDayOfWeek, GetCurrentMonth, то есть получить что-то. 
    * Здесь же вроде бы и методы, которые получают дату, день и месяц, но если просто читать эти имена, 
    * то кажется, что это просто свойства или поля. Что конечно же может ввести в заблуждение
    * 
    * Свойства и поля классов имеются существительными, например, date, time, currentDate и т.д. 
    * 
    * Я хотел бы, чтобы вы всей командой в дальнейшем следовали такому принципу написания кода.
    * Это, грубо говоря, правила хорошего тона
    * */

    constructor(props) {

        var today = new Date(),
            time =  today.getHours() + ":" + this.getCorrectMinutes(today.getMinutes()),
            dayOfWeekIndex = today.getDay(),
            day = today.getDate(),
            month = today.getMonth();

        this.state = {
            time: time,
            dayOfWeekIndex: dayOfWeekIndex,
            day: day,
            month: month,
        };
    }

    getTime() {
        return this.state.time;
    }

    getCorrectMinutes(minutes) {
        if (minutes < 10) {
            return "0" + minutes;
        }
        return minutes;
    }

    getIndexOfCurrentDayOfWeek() {
        return this.state.dayOfWeekIndex;
    }

    getCurrentMonth() {
        return this.state.month;
    }

    getCurrentDay() {
        return this.state.day;
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () =>
                this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        var today = new Date(),
            time = today.getHours() + ":" + this.getCorrectMinutes(today.getMinutes()),
            dayOfWeekIndex = today.getDay(),
            day = today.getDate(),
            month = today.getMonth();

        this.setState({
            time: time,
            dayOfWeekIndex: dayOfWeekIndex,
            day: day,
            month: month,
        });
    }

    getCurrentDayOfWeek() {
        var daysOfWeek = [
            'вс',
            'пн',
            'вт',
            'ср',
            'чт',
            'пт',
            'сб'
        ];
        return daysOfWeek[this.state.dayOfWeekIndex];
    }

}


