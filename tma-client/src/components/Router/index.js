import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header';
import Home from '../Home';
import Game from '../Game';
import './index.css';

export default class _ extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={Header} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/games/:id" component={Game} />
            <Route path="/*" component={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
