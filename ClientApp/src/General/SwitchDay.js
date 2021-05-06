import React, {Component} from 'react';
import CurrentDate from '../General/CurrentDate'
import './SwitchDay.css';
export class SwitchDay extends Component {

    currentDate = new CurrentDate();

    constructor(props) {
        super(props);

        this.state = {
            week: [
                'понедельник',
                'вторник',
                'среда',
                'четверг',
                'пятница',
                'суббота',
                'воскресенье'
            ],
            months: [
                'января',
                'февраля',
                'марта',
                'апреля',
                'мая',
                'июня',
                'июля',
                'августа',
                'сентября',
                'октября',
                'ноября',
                'декабря'
            ]
        };
    }

    render() {
        const { week, months } = this.state;

        return (
                <div className="dailySchedule">
                    <button className="switchDayButton">
                        &#8592;
                    </button>
                    <div  className="dailyScheduleDay">
                     {this.currentDate.getCurrentDay()} {months[this.currentDate.getCurrentMonth()]}, {week[this.currentDate.getIndexOfCurrentDayOfWeek()]},
                        нечетная неделя
                    </div>
                    <button className="switchDayButton">
                        &#8594;
                    </button>
                </div>
        );
    }
}

