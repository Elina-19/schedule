import React, {Component} from 'react';
import CurrentDate from './CurrentDate';
import './StatusBar.css';

export class StatusBar extends Component {

    currentDate = new CurrentDate();

    render() {
        return (
            <div className="statusBar">
                <div className="statusBarCurrentTime"  > {this.currentDate.state.time} </div>
                <div className="statusBarCurrentDay">{this.currentDate.dayOfWeek()}</div>
                <div  className="statusBarSearchAndInput"> <input className="statusBarInput" >
                </input>
                    <button  className="statusBarSearchButton">
                        Искать
                    </button>
                </div>
            </div>
        )

    }
}
