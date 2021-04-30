import React, {Component} from 'react';
import './SwitchDay.css';
import CurrentDate from '../General/CurrentDate'

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
            <div>
                <div className="dailyScheduleMain">
                    <div>
                        <button className="dailyScheduleButton">←</button>
                    </div>
                    <div><p
                        className="dailyScheduleP">{this.currentDate.currentDay()} {months[this.currentDate.currentMonth()]}, {week[this.currentDate.currentDayOfWeek()]}</p>
                    </div>
                    <div>
                        <button className="dailyScheduleButton">→</button>
                    </div>
                </div>
            </div>
        );
    }
}

