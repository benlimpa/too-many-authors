import React from 'react';
import './index.css';
import { firestore } from  '../../firebase/firebase';

export default class _ extends React.Component {
    state = {
        messages: [],


    }

    id = this.props.match.params.id;


    componentDidMount() {
        console.log(this.id);

        console.log(this.props.match.params.id);
        firestore.collection("messsages").doc(this.props.match.params.id).onSnapshot(function(doc){
            if(doc.exists){
                console.log("Current data: ", doc.data());
                //update messages first
                // if(doc.data())
                //     this.state.messages = doc.data();
            }
            else{
                console.log("new doc");
            }
        })
    }

    onKeyUp = (e) => {

        if(e.keyCode === 13 && e.target.value !== ''){
            e.preventDefault();
            // let dbCon = this.props.db.ref('/messages');
            firestore.collection('messages').doc(this.id).set({
                message: e.target.value
            })
            .catch(function(error) {
                console.error("error writing document: ", error);
            });
            // this.setState({
            //     message: ''
            // });
            e.target.value = '';
        }
    }

  render() {
    return (

        <div>
            <h1>Game</h1>

            <form>
                <textarea className="textarea" placeholder="Type a message" cols="100" onKeyUp={this.onKeyUp}>
                </textarea>
            </form>
        </div>

    );
  }
}
