import React, {Component} from 'react';
import './css/StatusDailySchedule.css';

export class StatusDailySchedule extends Component {
    constructor(props) {
        super(props);

        // У вас вызов времени часто применяется
        // и вырисовывается некий паттерн, который можно вынести в какой то класс, в котором будут прописаны методы, которые нужны и не надо будет создавать в каждом компоненете объект
        var today = new Date(),
            day = today.getDay(),
            month = today.getMonth();

        this.state = {
            day: day,
            month: month
        };
    }
    
    // Конечно можно через свич кейсы, но проще можно было бы сделать массив, в котором будут эти значения и по номеру индекса их получать
    // слегка замудренно получается
    currentDay() {
        switch (this.state.day) {
            case (1):
                return 'понедельник';
            case (2):
                return 'вторник';
            case (3):
                return 'среда';
            case (4):
                return 'четверг';
            case (5):
                return ('пятница');
            case (6):
                return ('суббота');
            case (7):
                return ('воскресенье');
            default:
                return ('');
        }
    }

    currentMonth() {
        switch (this.state.month) {
            case (0):
                return 'января';
            case (1):
                return 'февраля';
            case (2):
                return 'марта';
            case (3):
                return 'апреля';
            case (4):
                return ('мая');
            case (5):
                return ('июня');
            case (6):
                return ('июля');
            case (7):
                return ('августа');
            case (8):
                return ('сентября');
            case (9):
                return ('октября');
            case (10):
                return ('ноября');
            case (11):
                return ('декабря');

            default:
                return ('');
        }
    }

    render() {
        return (
            <div>
                <div className="dailyScheduleMain">
                    <div>
                        <button className="dailyScheduleButton">←</button>
                    </div>
                    <div><p className="dailyScheduleP">{this.state.day} {this.currentMonth()}, {this.currentDay()}</p>
                    </div>
                    <div>
                        <button className="dailyScheduleButton">→</button>
                    </div>
                </div>
            </div>
        );
    }
}

