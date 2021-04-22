import React, {Component} from 'react';
import '../custom.css';
import Moment from 'react-moment';

export class StatusBar extends Component {
    static displayName = StatusBar.name;

     state = {}
    
     callMe(){
         setInterval(() => {

         }, 1000);
     }

    render() {

        return (
            <div>
                {this.props.date.getDay()}
            </div>
        );
    }
}
