import React, { Component } from 'react';

import './footer.scss';

import cblogo from '../../images/LOGO FINAL.png';

class Footer extends Component {
  render () {
    return (
      <div className='footer row'>
        <div className='col-sm-2 padding-top-responsive'>
          <img src={cblogo} alt='logo-img' />
        </div>
        <div className='col-sm-10'>
          <p className='col-md-12 english-content'>English (United State)</p>
          <div className='col-sm-12 border-style' />
          <div className='row border-margin'>
            <div className='links col-md-12'>
              <div className='row parent-responsive-col-2'>
                <div className='col-md-2 float-right visible-lg' />
                <div className='col-md-2 float-right w-90'>
                  <h2>Other</h2>
                  <a href='javascript:void(0)'>Mobile app</a><br />
                </div>
                <div className='col-md-2 float-right'>
                  <h2>News</h2>
                  <a href='javascript:void(0)'>Updates</a><br />
                  <a href='javascript:void(0)'>Community</a><br />
                </div>
                <div className='col-md-2 float-right'>
                  <h2>Help</h2>
                  <a href='javascript:void(0)'>Account creation</a><br />
                  <a href='javascript:void(0)'>Account managment</a><br />
                  <a href='javascript:void(0)'>Account security</a><br />
                  <a href='javascript:void(0)'>Account recovery</a><br />
                  <a href='javascript:void(0)'>Settings and controls</a><br />
                </div>
                <div className='col-md-2 float-right'>
                  <h2>About us</h2>
                  <a href='javascript:void(0)'>CarBook</a><br />
                  <a href='javascript:void(0)'>Developers</a><br />
                  <a href='javascript:void(0)'>Website</a><br />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
