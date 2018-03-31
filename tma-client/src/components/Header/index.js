import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default class _ extends React.Component {
  render() {
    return (
      <div className="header row">
        <Link to="/">
          <h2>Too Mant Authors</h2>
        </Link>
        <div className="row" />
      </div>
    );
  }
}
