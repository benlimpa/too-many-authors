import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header';
import Home from '../Home';
import Game from '../Game';
import Archive from '../Archive';
import Login from '../Login';
import { storageKey, auth, isAuthenticated } from '../../firebase/firebase';
import './index.css';

const RouteWhenAuthorized = ({component: Component, ...rest}) => (
  <Route {...rest} render={renderProps => (
    isAuthenticated() ? (
      <Component {...renderProps} />
    ) : (
      <Redirect to={ {
        pathname: '/login',
        state: {from: renderProps.location}
      } } />
    )
  )}/>
)

export default class _ extends React.Component {
  static childContextTypes = {
    uid: PropTypes.string
  }

  getChildContext() {
    return {uid: this.state.uid};
  }
  state = {
      uid: null
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid);
        this.setState({uid: user.uid});
      } else {
        window.localStorage.removeItem(storageKey);
        this.setState({uid: null});
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={Header} />
          <Switch>
            <Route exact path="/" component={Home} />
<<<<<<< HEAD
            <RouteWhenAuthorized exact path="/browse" component={Browse} />
            <Route exact path="/game/:id" component={Game} />
            <Route exact path="/archive" component={Archive} />
            <Route exact path="/login" component={Login} />
=======
            <Route exact path="/games/:id" component={Game} />
            <Route path="/*" component={() => <Redirect to="/"/>} />
>>>>>>> 8845f1a79bc763eade2fe45a196b5a64a08acbba
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
