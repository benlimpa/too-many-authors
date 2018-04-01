import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "../Header";
import Home from "../Home";
import Game from "../Game";
import Login from "../Login";
import { storageKey, auth, isAuthenticated } from "../../firebase/firebase";
import "./index.css";

const RouteWhenAuthorized = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={renderProps =>
      isAuthenticated() ? (
        <Component {...renderProps} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: renderProps.location }
          }}
        />
      )
    }
  />
);

export default class _ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null
    };
  }


  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ authUser: user });
      } else {
        this.setState({ authUser: null });
      }
    });
  }

  render() {
    let tempAuthUser = this.state.authUser;
    console.log("authuser: " + this.state.authUser);
    return (
      <BrowserRouter>
        <div>
          <Route path="/" render={(props) => <Header authUser={this.state.authUser} />} />
          <Switch>
            <RouteWhenAuthorized exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/game/:id" render={(p) => <Game id={p.match.params.id} authUser={this.state.authUser} />} />
            <Route path="/*" component={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
