import React, { Component } from 'react';

import LeftStaticSide from './leftStaticSide';
import Registration from './registration';

import './registration.scss';

class Main extends Component {
  render () {
    return (
      <div className='container mt-80'>
        <div className='row'>
          <div className='col-md-4 padding-section-1 height-100'>
            <LeftStaticSide />
          </div>
          <div className='col-md-8 padding-section-2 height-100'>
            <Registration />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
