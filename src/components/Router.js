import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
// import Profile from './Profile';
import NotFound from './NotFound';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);


export default Router;
