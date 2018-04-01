/* eslint-disable no-unused-vars*/

import React from "react";
import "./index.css";
import { db, firestore } from "../../firebase/firebase";
//const NLP = require('google-nlp');

const playersObj = {
  "8Dr3iPTM57b7FpbVBNAhUTW8Xhp2": "Ben",
  DiOzjTGOTQXpR36pHP4mQuMacdA3: "Hakan",
  P1wXYlu9lkXZt3QA4S7q9Yk0A5a2: "Gautam",
  IKTQwJzNbshEXyNj8gDjMLEnY0Y2: "Sandro",
  ZddSsMJLAvgE9jnH46KfOun3JXZ2: "Michael"
};

export default class _ extends React.Component {
  state = {
    entries: [],
    message: "",
    maxLines: 10,
    players: [],
    playerIndex: 0,
    showText: false
  };

  id = this.props.id;

  render() {
    if (this.props.authUser)
      db.ref(`/players/${this.props.authUser.uid}`).on("value", snap => {
        db
          .ref(`/${this.id}/players/${this.props.authUser.uid}`)
          .set({ name: snap.val(), active: false });
      });
    let { entries, message, rounds, players, playerIndex } = this.state;
    return (
      <div className="game row f">
        <div className="entries-input-container">
          <div className="entries">
            {entries.map((entry, i) => {
              return (
                <div key={i} className="entry">
                  <h2 className="name">{entry.name || "name"}</h2>
                  {this.state.showText ? (
                    <h2 className="message">{entry.message}</h2>
                  ) : null}
                  <div className="images row">
                    {(entry.images || ["", "", ""]).map((url, i) => {
                      return (
                        <img
                          key={i}
                          src={
                            url ||
                            "http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder4.png"
                          }
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
            { this.state.entries.length >= this.state.maxLines ? null :
            <input
              disabled={
                Object.keys(players)[playerIndex] !==
                (this.props.authUser ? this.props.authUser.uid : "")
              }
              className="textarea f"
              placeholder={
                Object.keys(players)[playerIndex] !==
                (this.props.authUser ? this.props.authUser.uid : "")
                  ? playersObj[players[playerIndex]] + " is typing"
                  : "it's your turn!"
              }
              cols="100"
              //value = message; { Object.keys(players)[playerIndex]  !== this.props.uid ? message : "" }
              value={message}
              onKeyUp={this.onKeyUp}
              onChange={e => this.setState({ message: e.target.value })}
            />
            }
          </div>
        </div>
        <div className="stats">
          <h2>Players</h2>
          {Object.values(players).map((player, i) => {
            return (
              <div
                key={i}
                className="row"
                style={{
                  alignItems: "center",
                  marginLeft: player.active ? "-1.5rem" : 0
                }}
              >
                {player.active ? <div className="active-dot" /> : null}
                <h3>{player.name || "name"}</h3>
              </div>
            );
          })}

          <h2 style={{ marginTop: "1rem" }}>Game Stats</h2>
          <h3>
            {this.state.entries.length} / {this.state.maxLines} lines
          </h3>
          <h3>code: {this.id}</h3>
          {this.state.entries.length >= this.state.maxLines ? (
            <button
              type="button"
              onClick={() => {
                this.setState({ showText: !this.state.showText });
              }}
            >
              {this.state.showText ? "Hide Text" : "Show Text"}
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  componentDidMount() {
    // console.log('this.props.authUser.uid', this.props.authUser.uid)

    // db.ref(`/${this.id}/players/${this.props.authUser.uid}`).set({ name: players[this.props.authUser.uid], active: false });

    db.ref(`/${this.id}/players`).on("value", snap => {
      this.setState({ players: snap.val() });
      console.log("asdf");
      console.log(Object.values(snap.val()));
    });
    db.ref(`/${this.id}/entries`).on("value", snap => {
      this.setState({ entries: Object.values(snap.val() || {}) });
    });
    db.ref(`/${this.id}/stats/playerIndex`).on("value", snap => {
      if (!snap.val()) {
        db.ref(`/${this.id}/stats/playerIndex`).set(0);
        this.setState({ playerIndex: 0 });
      } else this.setState({ playerIndex: snap.val() });
    });
  }

  onKeyUp = e => {
    let { message } = this.state;
    if (e.keyCode === 13 && message !== "") {
      fetch(
        "https://language.googleapis.com/v1/documents:analyzeEntities?key=AIzaSyCvtPpagYGxMxyBQ4XGSYGWgEK4OnxouPU",
        {
          body: JSON.stringify({
            document: {
              type: "PLAIN_TEXT",
              language: "EN",
              content: message
            },
            encodingType: "UTF8"
          }),
          mode: "cors",
          method: "POST"
        }
      )
        .then(res => res.json())
        .then(res => {
          console.log(res);
          console.log(res.entities[0].name);
          //get the image for each word

          let words = res.entities.map(
            v =>
              "https://source.unsplash.com/500x500/?" +
              v.name.replace(/\s/g, "")
          );

          console.log(words);

          db
            .ref(`/players/${this.props.authUser.uid}`)
            .once("value")
            .then(snapshot => {
              db.ref(`/${this.id}/entries`).push({
                name: snapshot.val(),
                message,
                images: words
              });
            });

          // words = [];
          // forEach(entity in entities){
          //   words
          // }
        });

      this.setState({ message: "" });
      db
        .ref(`/${this.id}/stats/playerIndex`)
        .set(
          (this.state.playerIndex + 1) % Object.keys(this.state.players).length
        );
    }
  };
}
