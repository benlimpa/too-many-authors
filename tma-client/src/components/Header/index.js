import React from 'react';
import { Link } from 'react-router-dom'
import './index.css';

export default class _ extends React.Component {
  render() {
    return (
      <div className="header row">
        <Link to="/">
          <h2>Too Mant Authors</h2>
        </Link>
        <div className="row">
          <Link to="/games">
            <h2>Games</h2>
          </Link>
          <Link to="/archives">
            <h2>Archives</h2>
          </Link>
        </div>
      </div>
    );
  }
}
