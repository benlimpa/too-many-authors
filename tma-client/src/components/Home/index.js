/* eslint-disable no-unused-vars*/

import React from "react";
import { Link } from "react-router-dom";
import { generate } from "shortid";
import { db } from "../../firebase/firebase";
import "./index.css";
export default class _ extends React.Component {
  state = {
    games: [{},{},{}],
    archives: [{},{}]
  };

  render() {
    return (
      <div className="home">
        <h2>Games</h2>
        <div className="row preview-container">
          <Link className="preview xy" to={`/game/${generate()}`}>
            <img
              alt="plus"
              src={require("../../assets/plus.svg")}
              className="plus"
            />
          </Link>
          {this.state.games.map((game, i) => {
            return (
              <Link key={i} to={`/game/${game.id}`} className="preview">

              </Link>
            );
          })}
          <div className="preview" style={{ height: 0 }} />
          <div className="preview" style={{ height: 0 }} />
        </div>
        <h2>Archives</h2>
        <div className="row preview-container">
          {this.state.archives.map((archive, i) => {
            return (
              <Link key={i} to={`/game/${archive.id}`} className="preview">

              </Link>
            );
          })}
          <div className="preview" style={{ height: 0 }} />
          <div className="preview" style={{ height: 0 }} />
        </div>
      </div>
    );
  }
}
