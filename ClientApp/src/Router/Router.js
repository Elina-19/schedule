import React from 'react';
import Audience from '../ClassComponents/Audience';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NotFoundPage from '../General/NotFoundPage'
import Floor from '../FloorComponents/Floor'

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/class/:classId" component={Audience}/>
                <Route path="/floor/:floorId" component={Floor}/>
                // https://reactrouter.com/web/example/no-match переделать, как тут описано
                <Route component={NotFoundPage}/>
            </Switch>
        </BrowserRouter>
    );
};
export default Router;