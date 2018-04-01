/* eslint-disable no-unused-vars*/

import React from "react";
import { Link } from "react-router-dom";
import { generate } from "shortid";
import { db } from "../../firebase/firebase";
import "./index.css";

export default class _ extends React.Component {
  state = {
    games: [],
    archives: []
  };

  render() {
    console.log('state', this.state)
    let id = generate();

    return (
      <div className="home">
        <h2>Games</h2>
        <div className="row preview-container">
          <Link
            className="preview xy"
            to={`/game/${id}`}
            onClick={() => {
              db.ref(`/${this.id}`).update({ active: true, entries: [], players: [] });
            }}>
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

  componentDidMount() {
    db.ref('/').on('value', snap => {
      let data = snap.val();
      let games = [];
      let archives = [];
      Object.keys(data).forEach(key => {
        if (key !== 'players') {
          if (data[key].active) {
            games.push(data[key]);
          } else {
            archives.push(data[key]);
          }
        }
      });

      this.setState({ games, archives });
    });
  }
}
