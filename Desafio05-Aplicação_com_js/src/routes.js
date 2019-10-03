import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Repository from './pages/Repository'
import React from 'react';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
         < Route path = "/" exact  component = { Main }   />
        <Route path="/repository/:repository/issues/:selected/:page?" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}

