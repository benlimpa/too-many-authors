import React from 'react';
import { auth } from '../../firebase/firebase';
import { Redirect } from 'react-router';
import './index.css';

export default class _ extends React.Component {
  state = {
    email: '',
    password: '',
    redirectToReferrer: false,
    loginFailed: false
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    try {
        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
          this.setState({redirectToReferrer: true});
        });
    }
    catch (err)
    {
        this.setState({loginFailed: true});
    }
  }

  render() {
    const {from} = this.props.location.state || '/';
    const {redirectToReferrer} = this.state;

    return (
      <section>
        {redirectToReferrer && (
          <Redirect to={from || '/'}/>
        )}
        {from && (
          <p>You must log in to view the page at {from.pathname}</p>
        )}
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.email} onChange={e => this.setState({email: e.target.value})} />
          <input type="password" value={this.state.password} onChange={e => this.setState({password: e.target.value})} />
          <button type="submit">Sign In</button>
        </form>
        {this.state.loginFailed && (<p>Login failed</p>)}
      </section>
    );
  }
}
