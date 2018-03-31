import React from 'react';
import UidProvider from '../../firebase/UidProvider';
import './index.css';

export default class _ extends React.Component {
  render() {
    return <UidProvider>{(uid) => (<BrowsePage uid={uid} />)}</UidProvider>;
  }
}

class BrowsePage extends React.Component {
    render() {
        return (
        <div>
            <h1>Browse</h1>
            <h1>Welcome {this.props.uid}</h1>
        </div>
        );
    }
}
