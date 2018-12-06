import React, { Component } from 'react';

import {connect} from 'react-redux';

import * as actions from '../../actions';

class Signout extends Component {
  render () {
    return (
      <div className='logout-btn-div'>
        <button className='logout-btn' onClick={() => this.props.signoutUser()}>Logout</button>
      </div>
    );
  }
}

export default connect(null, actions)(Signout);
