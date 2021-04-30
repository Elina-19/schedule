import React, {Component} from 'react';
import './SwitchDay.css';

export class SwitchDay extends Component {
    constructor(props) {
        super(props);

        // У вас вызов времени часто применяется
        // и вырисовывается некий паттерн, который можно вынести в какой то класс, в котором будут прописаны методы, которые нужны и не надо будет создавать в каждом компоненете объект
        var today = new Date(),
            day = today.getDay(),
            month = today.getMonth();

        this.state = {
            day: day,
            month: month,
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
        return (
            <div>
                <div className="dailyScheduleMain">
                    <div>
                        <button className="dailyScheduleButton">←</button>
                    </div>
                    <div><p
                        className="dailyScheduleP">{this.state.day} {this.state.months[this.state.month]}, {this.state.week[this.state.day]}</p>
                    </div>
                    <div>
                        <button className="dailyScheduleButton">→</button>
                    </div>
                </div>
            </div>
        );
    }
}

