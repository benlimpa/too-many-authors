import React from "react";
import * as auth from "../../firebase/auth";
import { withRouter, Link } from "react-router-dom";
import "./index.css";

const LoginPage = ({ history }) => (<LoginCorePage history={history} />);

const INIT_STATE = {
  email: "",
  password: "",
  error: null
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class LoginCorePage extends React.Component {
  state = {
    ...INIT_STATE
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const {email, password} = this.state;
    const {history} = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
    .then(() => {
      this.setState(() => ({...INIT_STATE}));
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
            placeholder=" Email"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            placeholder=" Password"
            type="password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Sign In</button>
        </form>
        {this.state.error && <p>Login failed</p>}
        <Link id="acc" to={"/signup"}>or Create a new Account</Link>
      </section>
    );
  }
}

export default withRouter(LoginPage);
