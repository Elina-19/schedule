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
            day = today.getDay();

        this.state = {
            time: time,
            day: day
        };
    }

    getCorrectMinutes(minutes) {
        if (minutes < 10) {
            return "0" + minutes;
        }
        return minutes;
    }

    // Посмотрите, есть ли в JS такое понятие как статические методы
    currentDayOfWeek() {
        // Сделай Today свойством класса и один раз инициализируй его в конструкторе.
        // Потом вызывай в методох необходимые методы
        const today = new Date();
        return today.getDay();
    }

    currentMonth() {
        const today = new Date();
        return today.getMonth();
    }

    currentDay() {
        const today = new Date();
        return today.getDate();
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
            time = today.getHours() + ":" + this.getCorrectMinutes(today.getMinutes());
        this.setState({
            time: time,
        });
    }

    dayOfWeek() {
        var daysOfWeek = [
            'пн',
            'вт',
            'ср',
            'чт',
            'пт',
            'сб',
            'вс'
        ];
        return daysOfWeek[this.state.day];
    }

}


