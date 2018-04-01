import React from "react";
import * as auth from "../../firebase/auth";
import { db } from "../../firebase/firebase";
import { withRouter } from "react-router-dom";
import "./index.css";

const SignUpPage = ({ history }) => (<SignUpCorePage history={history} />);

const INIT_STATE = {
  username: "",
  email: "",
  password: "",
  error: null
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpCorePage extends React.Component {
  state = {
    ...INIT_STATE
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const {username, email, password} = this.state;
    const {history} = this.props;
    
    auth.doCreateUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      this.setState(() => ({...INIT_STATE}));
      db.ref(`/players/${authUser.uid}`).set(username);
      history.push('/');
    })
    .catch(err => {
      this.setState(byPropKey('error', err));
    });
  };

  render() {
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value})}
          />
          <input
            type="text"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Sign Up</button>
        </form>
        {this.state.error && <p>SignUp failed</p>}
      </section>
    );
  }
}

export default withRouter(SignUpPage);