import React from 'react';
import AudienceContainer from '../../containers/AudienceContainer';

import FloorContainer from '../../containers/FloorContainer';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import Floor from '../Floor/Floor'

// https://reactrouter.com/web/example/no-match переделать, как тут описано

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/audience/:audienceId" component={AudienceContainer}/>
                <Route path="/floor/:floorId" component={FloorContainer}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </BrowserRouter>
    );
};
export default Router;