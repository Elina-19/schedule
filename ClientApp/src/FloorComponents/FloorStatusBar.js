import React, {Component} from 'react';
import '../custom.css';

export class FloorStatusBar extends Component {
    
    //вроде не нужен так как импортируем из папки components

    constructor(props) {

        super(props);

        var today = new Date(),
            time = today.toLocaleTimeString(),
            day = today.getDay();

        this.state = {

            time: time,
            day: day

        };
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () =>
                this.tick(), 1000);
    }

    componentWillMount() {
        clearInterval(this.intervalID);
    }

    tick() {
        var today = new Date(),
            time = today.toLocaleTimeString();
        this.setState({
            time: time,
        });
    }

    currentDay() {
        switch (this.state.day) {
            case (1):
                return 'пн';
            case (2):
                return 'вт';
            case (3):
                return 'ср';
            case (4):
                return 'чт';
            case (5):
                return ('пт');
            case (6):
                return ('сб');
            case (7):
                return ('вс');
            default:
                return ('');
        }
    }

    render() {
        return (
            <div className = "floorStatusBar">
                <div className="floorStatusBarCurrentTime"> {this.state.time} </div>
                <div className="floorStatusBarCurrentDay">{this.currentDay()}</div>
                <div className="floorStatusBarSearchAndInput">
                    <input className="floorStatusBarInput"></input>
                    <button className="floorStatusBarSearchButton">
                        Искать
                    </button>
                </div>
            </div>
        )
    }

}