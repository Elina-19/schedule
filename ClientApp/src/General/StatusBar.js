import React, {Component} from 'react';
import CurrentDate from './CurrentDate';
import './StatusBar.css';

export class StatusBar extends Component {

    constructor(props) {
        super(props)

        var currentDate = new CurrentDate();

        this.state = {
            currentDate: currentDate,
        };
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
        var currentDate = new CurrentDate();

        this.setState({
            currentDate: currentDate,
        });
    }

    render() {
        return (
            <div className="statusBarStatus">
                <div className="statusBarLeft">
                    <div className="statusBarTime"> {this.state.currentDate.getTime()} </div>
                    <div className="statusBarDays">
                        <div>{this.state.currentDate.getCurrentDayOfWeek()}</div>
                        <div>{this.state.currentDate.getCurrentDayOfWeek()}</div>
                    </div>
                </div>
                <div className="statusBarWeek"> нечетная неделя</div>
            </div>
        )

    }
}
