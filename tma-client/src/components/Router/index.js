import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../Header';
import Home from '../Home';
import Browse from '../Browse';
import Game from '../Game';
import Archive from '../Archive';
import './index.css';

export default class _ extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={Header} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/browse" component={Browse} />
            <Route exact path="/game/:id" component={Game} />
            <Route exact path="/archive" component={Archive} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
