import React from "react";
import { Link } from "react-router-dom";
import * as auth from "../../firebase/auth";
import "./index.css";

export default class _ extends React.Component {
  render() {
    return (
      <div className="header row">
        <Link to="/">
          <h4>Too Many Authors</h4>
        </Link>
        {this.props.authUser && (<button type="button" onClick={auth.doSignOut}>Signout</button>)}
        <p>{this.props.authUser ? this.props.authUser.uid : 'Not Signed in'}</p>
        <div className="row" />
      </div>
    );
  }
}
