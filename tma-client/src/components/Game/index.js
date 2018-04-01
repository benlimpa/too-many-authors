import React from "react";
import "./index.css";
import { firestore } from "../../firebase/firebase";
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
    entries: []
  };

  id = this.props.id;

  componentDidMount() {
    console.log(this.id);

    firestore
      .collection("games")
      .doc(this.id)
      .onSnapshot((docSnap) => {
        docSnap.ref.collection('entries').get().then((docs) => {this.setState({ entries: docs});})
        console.log("entries updated");
      })
  }

  onKeyUp = e => {
    if (e.keyCode === 13 && e.target.value !== "") {
      let text = e.target.value;
      e.preventDefault();
      firestore
        .collection("games")
        .doc(this.id)
        .collection("entries")
        .add({
          uid: this.props.uid,
          timeStamp: Date.now(),
          message: e.target.value
        })
        .catch(function(error) {
          console.error("error writing document: ", error);
        });
      e.target.value = "";

      //nlp stuff
      //	Import this module


//	Google Cloud API key
      const apiKey = "AIzaSyCvtPpagYGxMxyBQ4XGSYGWgEK4OnxouPU";

// 	Text to send to Google NLP

      console.log("text: " + text);

// 	Instantiate he NLP class with your Google Cloud API key
      let nlp = new NLP( apiKey );


      /**
       *  Analyze entities from the text string
       */

      nlp.analyzeEntities( text )
        .then(function( entities ) {
          // 	Output returned entities
          console.log( 'Entities:', entities );
        })
        .catch(function( error ) {
          // 	Error received, output the error
          console.log( 'Error:', error.message );
        })

      //google image search each entity

    }
  };

  render() {
    return (
      <div>
        <h1>Game</h1>

        <form>
          <textarea
            className="textarea"
            placeholder="Type a message"
            cols="100"
            onKeyUp={this.onKeyUp}
          />
        </form>
      </div>
    );
  }
}
