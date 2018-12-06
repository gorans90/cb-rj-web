import React, { Component } from 'react';

import {connect} from 'react-redux';

import './loaders.scss';
import loader from '../../images/loader-car.gif';

class FullScreenLoader extends Component {
  render () {
    const {hide, requestProcessing} = this.props;
    let loading = false;
    if (requestProcessing) {
      loading = true;
    }
    if (hide || !loading) {
      return <div />;
    }
    return (
      <div className={`loader-background fade-in-opacity`}>
        <div className='loader-frame '>
          <div className='loader' />
          <div>
            <img src={loader} alt='gl-logo-white' />
            <div className='lds-css-first'>
              <div className='lds-default' />
            </div>
          </div>
        </div>
      </div>
    );
  };
}

function mapStateToProps (state) {
  return {
    requestProcessing: state.auth.requestProcessing
  };
}

export default connect(mapStateToProps, null)(FullScreenLoader);
