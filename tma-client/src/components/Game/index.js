/* eslint-disable no-unused-vars*/

import React from "react";
import "./index.css";
import { db, firestore } from "../../firebase/firebase";
import UidProvider from "../../firebase/UidProvider";
const NLP = require('google-nlp');


export default class _ extends React.Component {
  render() {
    return (
      <UidProvider>
        {uid => <GamePage uid={uid} id={this.props.match.params.id} />}
      </UidProvider>
    );
  }
}

class GamePage extends React.Component {
  state = {
    entries: [],
    message: '',
    rounds: 0,
    players: []
  }

  id = this.props.id;

  render() {
    let { entries, message, rounds, players } = this.state;
    return (
      <div className="game row f">
        <div className="entries-input-container">
          <div className="entries">
            {entries.map((entry, i) => {
              return (
                <div key={i} className="entry">
                  <h4 className="name">{entry.name || 'name'}</h4>
                  <h4 className="message">{entry.message}</h4>
                  <div className="images row">
                    {(entry.images || ['','','']).map((url, i) => {
                      return (
                        <img
                          key={i}
                          src={url || 'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder4.png'}
                          alt="image"
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="">
            <input
              className="textarea f"
              placeholder="Type a message"
              cols="100"
              value={message}
              onKeyUp={this.onKeyUp}
              onChange={e => this.setState({ message: e.target.value })}
            />
          </div>
        </div>
        <div className="stats">
          <h2>Players</h2>
          {players.map((player, i) => {
            return (
              <div key={i} className="row" style={{ alignItems: 'center', marginLeft: player.active ? '-1.5rem' : 0 }}>
                {player.active ? <div className="active-dot"></div> : null}
                <h3>{player.name || 'name'}</h3>
              </div>
            );
          })}

          <h2 style={{ marginTop: '1rem' }}>Game Stats</h2>
          <h3>{rounds} / 3 rounds</h3>
          <h3>code: {this.id}</h3>
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log('THIS.PROPS.UID', this.props.uid)
    db.ref(`/${this.id}/players/${this.props.uid}`).set({ name: 'bob', active: false });
    db.ref(`/${this.id}/players`).on('value', snap => {
      this.setState({ players: Object.values(snap.val() || {}) });
    });
    db.ref(`/${this.id}/entries`).on('value', snap => {
      this.setState({ entries: Object.values(snap.val() || {}) });
    });
  }

  onKeyUp = e => {
    let { message } = this.state;
    if (e.keyCode === 13 && message !== '') {
      // fetch('')
      // .then()

      db.ref(`/${this.id}/entries`).push({
        message,
        images: [
          'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder4.png',
          'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder4.png',
          'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder4.png'
        ]
      })

      this.setState({ message: '' });
    }
  }
}
