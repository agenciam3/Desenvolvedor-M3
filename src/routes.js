import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ClothesScreen from './screens/clothes';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={ClothesScreen}/>
            <Route exact path='/mostrecent' component={ClothesScreen}/>
            <Route exact path='/lowestprice' component={ClothesScreen}/>
            <Route exact path='/biggestprice' component={ClothesScreen}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;