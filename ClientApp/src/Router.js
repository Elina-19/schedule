import React from 'react';
import App from './App';
import {BrowserRouter,Route,Switch}  from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage'
import FloorApp from './FloorComponents/FloorApp'



const Router =(props)=>{
    return(
        <BrowserRouter>
            <Switch>
                <Route  path="/currentclass/:classId" component={App}/>
                <Route path="/currentfloor/:floorId" component={FloorApp}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </BrowserRouter>
    );
};
export default Router;