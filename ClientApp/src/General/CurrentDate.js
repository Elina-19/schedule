export default class CurrentDate {

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

    currentDayOfWeek() {
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


