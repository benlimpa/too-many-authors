import React from "react";
import "./index.css";
import { firestore } from "../../firebase/firebase";
import UidProvider from "../../firebase/UidProvider";

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
