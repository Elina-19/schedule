import React from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import Floor from '../Floor/Floor';
import Audience from '../Audience/Audience';

const NotFoundPage = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/audience/1301/"><h3>Расписание на аудиторию</h3></Link>
                </li>
                <li>
                    <Link to="/floor/13"><h3>Расписание на этаж</h3></Link>
                </li>
            </ul>
            <div>
                <center>
                    <h3>
                        <p>
                            Страница не найдена
                        </p>
                    </h3>
                </center>
            </div>
            <BrowserRouter>
                <Switch>
                    <Route path="/audience/:audienceId" component={Audience}/>
                    <Route path="/floor/:floorId" component={Floor}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}


export default NotFoundPage;