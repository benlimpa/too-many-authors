import React from "react";
import { Link } from "react-router-dom";
import { generate } from "shortid";
import "./index.css";

export default class _ extends React.Component {
  state = {
    games: [{}, {}, {}, {}, {}, {}, {}],
    archives: [{}, {}, {}, {}, {}, {}, {}]
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
<<<<<<< HEAD
            return (
              <Link key={i} to={`/game/${game.id}`} className="preview">

              </Link>
            );
=======
            return <Link to={`/game/${game.id}`} className="preview" />;
>>>>>>> f89cfa1eabaa3196a08214bc59bc8a78ae0c1e18
          })}
          <div className="preview" style={{ height: 0 }} />
          <div className="preview" style={{ height: 0 }} />
        </div>
        <h2>Archives</h2>
        <div className="row preview-container">
          {this.state.archives.map((archive, i) => {
<<<<<<< HEAD
            return (
              <Link key={i} to={`/game/${archive.id}`} className="preview">

              </Link>
            );
=======
            return <Link to={`/game/${archive.id}`} className="preview" />;
>>>>>>> f89cfa1eabaa3196a08214bc59bc8a78ae0c1e18
          })}
          <div className="preview" style={{ height: 0 }} />
          <div className="preview" style={{ height: 0 }} />
        </div>
      </div>
    );
  }
}
