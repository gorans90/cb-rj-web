import React, { Component } from 'react';
import {connect} from 'react-redux';
import loader from '../../images/loader-car.gif';

import './loaders.scss';

class ComponentLoader extends Component {
  render () {
    let loading = false;
    if (this.props.requestProcessing) {
      loading = true;
    }
    const {hide} = this.props;
    if (hide || !loading) {
      return <div />;
    }
    return (
      <div className='component-loader-background'>
        <div className='component-frame'>
          <div className='component-loader' />
          <img src={loader} alt='gl-logo-white' />
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

export default connect(mapStateToProps, null)(ComponentLoader);
