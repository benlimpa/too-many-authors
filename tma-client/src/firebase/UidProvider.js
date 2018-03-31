import React from 'react';
import PropTypes from 'prop-types';

export default class UidProvider extends React.Component {
  static contextTypes = {
    uid: PropTypes.string
  }

  render() {
    return this.props.children(this.context.uid);
  }
}
