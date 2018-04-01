import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../../firebase/auth";
import { db } from "../../firebase/firebase";
import "./index.css";

const HeaderPage = ({ history, authUser }) => <HeaderCore history={history} authUser={authUser} />;

class HeaderCore extends React.Component {
  constructor(props) {
    super(props);
    // this.tryGettingName = this.tryGettingName.bind(this);
    this.state = {currentUsername: "Not Signed In"};
  }

  // tryGettingName() {
  //   if (!this.props.authUser) {
  //     this.setState({ currentUsername: "Not Signed In" });
  //     setTimeout(this.tryGettingName, 100);
  //   } else
  //     db.ref(`/players/${this.props.authUser.uid}`).on("value", snap => {
  //       this.setState({ currentUsername: snap.val() });
  //     });
  // }

  // componentDidMount() {
  //   this.tryGettingName();
  // }

  signOutAndRedirect = () =>
    auth.doSignOut().then(() => this.props.history.push("/login"));
  
  componentDidUpdate(prevProps, prevState)
  {
    if (this.props.authUser === prevProps.authUser)
      return;
    
    if (this.props.authUser) {
      db.ref(`/players/${this.props.authUser.uid}`).on("value", snap => {
        console.log("Setting name: " + snap.val());
        this.setState({ currentUsername: snap.val() });
      });
    }
    else
      this.setState({ currentUsername: "Not Signed In" });
  }

  render() {
    return (
      <div className="header row">
        <Link to="/">
          <h4>Too Many Authors</h4>
        </Link>
        {this.props.authUser && (
          <button type="button" onClick={this.signOutAndRedirect}>
            Signout
          </button>
        )}
        <p>{this.state.currentUsername}</p>
        <div className="row" />
      </div>
    );
  }
}

export default withRouter(HeaderPage);
