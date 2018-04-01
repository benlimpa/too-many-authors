import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default class _ extends React.Component {
  render() {
    return (
      <div className="header row">
        <Link to="/">
          <h4>Too Many Authors</h4>
        </Link>
        <div className="row" />
      </div>
    );
  }
}
