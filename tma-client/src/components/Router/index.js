import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../Header';
import Home from '../Home';
import Browse from '../Browse';
import Games from '../Games'; // this is the room that show
import Game from '../Game';
import Archives from '../Archives';
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
            <Route exact path="/games" component={Games} />
            <Route exact path="/games/:id" component={Game} />
            <Route exact path="/archives" component={Archives} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
