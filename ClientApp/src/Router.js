import React from 'react';
import App from './App';
import {BrowserRouter,Route,Switch}  from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage'
import FloorApp from './FloorComponents/FloorApp'



const Router =(props)=>{
    return(
        <BrowserRouter>
            <Switch>
                // Лучше не currentclass и currentfloor, а просто class и floor
                <Route  path="/currentclass/:classId" component={App}/>
                <Route path="/currentfloor/:floorId" component={FloorApp}/>
                // https://reactrouter.com/web/example/no-match переделать, как тут описано
                <Route component={NotFoundPage}/>
            </Switch>
        </BrowserRouter>
    );
};
export default Router;