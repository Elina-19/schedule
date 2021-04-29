import React from 'react';
import {BrowserRouter,Route,Switch,Link}  from 'react-router-dom';
import FloorApp from '../FloorComponents/FloorApp';
import App from '../App';
const NotFoundPage = () =>
{
    return(
            <div>
                    <ul>
                        <li>
                            <Link to="/class/:classId"><h3>Расписание на аудиторию</h3></Link>
                        </li>
                        <li>
                            <Link to="/floor/:floorId"><h3>Расписание на этаж</h3></Link>
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
                    <Route path="/class/:classId" component={App}/>
                    <Route path="/floor/:floorId" component ={FloorApp}/>
                </Switch>
                </BrowserRouter>
            </div>
    );
}
// function Floor() {
//     return <h2>Расписание на этаж</h2>;
// }
//
// function Class() {
//     return <h2>Расписание на аудиторию</h2>;
// }
export default NotFoundPage;