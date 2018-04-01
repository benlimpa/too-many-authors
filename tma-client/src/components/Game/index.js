import React from 'react';
import './index.css';
import { firestore } from  '../../firebase/firebase';
import UidProvider from '../../firebase/UidProvider';

import { db } from "../../firebase/firebase";

const NLP = require('google-nlp');


var url=window.location.href;
var id=url.split('/')[4];
var maxRounds = 0;
var curRounds = 0;
var names = [
  "Name 1",
  "Name 2",
  "Name 3",
  "Name 4"
];
let arrayNames = names.map(item => <div key={item}> {item}</div>)
var nList=names.join();
var title = "Title of the game";
var turn = 0;

export default class _ extends React.Component {
    render() {
        return (<UidProvider>{(uid) => (<GamePage uid={uid} id={this.props.match.params.id} />)}</UidProvider>);
    }
}

class GamePage extends React.Component {
    state = {
        entries: [],
    }

    id = this.props.id;

    componentDidMount() {
        console.log(this.id);

        firestore.collection('games').doc(this.id).collection('entries').get().then(function(snapshot) {
            this.setState({entries: snapshot.docs});
        })
        .catch(function(err) {console.error("no matching entries: " + err)});
    }

    onKeyUp = (e) => {

        if(e.keyCode === 13 && e.target.value !== ''){
            e.preventDefault();
            firestore.collection('games').doc(this.id).collection('entries').add({
                uid: this.props.uid,
                timeStamp: Date.now(),
                message: e.target.value
            })
            .catch(function(error) {
                console.error("error writing document: ", error);
            });
            e.target.value = '';
        }
    }

  render() {
    return (

        <div class="container">
        <div id="gameTitle">
        <h3>{title}</h3>
        </div>
        <div id="cont1">
          <h1 class="h">Game</h1>
          <p id="rounds"> Rounds {curRounds}/{maxRounds}</p>
          <p id="gamecode">Game Code {id} </p>
          <p id="turnIs"> It is {names[turn]}s turn</p>
          <h2 class="h">Players</h2>
          <p id="names">
          {arrayNames}
          </p>
            </div>
            <div>
            <form>
                <textarea className="textarea" placeholder="Continue the story........" cols="100" onKeyUp={this.onKeyUp}>
                </textarea>
            </form>
            </div>
        </div>

    );
  }
}
