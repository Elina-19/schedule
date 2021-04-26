import React, {Component} from 'react';
import './StatusDailySchedule.css';

export class StatusDailySchedule extends Component {
    constructor(props) {
        super(props);

        var today = new Date(),
            day = today.getDay(),
            month = today.getMonth();

        this.state = {
            day: day,
            month: month
        };
    }

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

