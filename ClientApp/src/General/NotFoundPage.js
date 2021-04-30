import React from 'react';
import {BrowserRouter,Route,Switch,Link}  from 'react-router-dom';
import Floor from '../FloorComponents/Floor';
import Class from '../ClassComponents/Class';
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
                    <Route path="/class/:classId" component={Class}/>
                    <Route path="/floor/:floorId" component ={Floor}/>
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