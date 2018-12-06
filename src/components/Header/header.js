import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as indexActions from '../../actions/index';
import * as userActions from '../../actions/user';
import * as realtime from '../../actions/realtime/realtime';

import { SigninNoMD, Signout } from '../Auth';

import { ROOT_ROUTE } from '../../helper/routes';

import logo from '../../images/cbfont.png';

import './header.scss';

class Header extends Component {
  componentWillMount () {
    const userID = sessionStorage.getItem('user_id');
    if (userID) {
      this.props.actions.userActions.getUserInfo(userID, true);
    }
    this.props.actions.realtime.connect();
    realtime.reconnect();
  }
  render () {
    const { authenticated } = this.props;
    return (
      <nav className='main-navbar container'>
        <div className='row height-100'>
          <div className='col-sm-4 height-100'>
            <div className='navbar-brand pointer' ><a href={ROOT_ROUTE} ><img src={logo} alt='logo-img' /></a></div>
          </div>
          <div className='col-sm-8 height-100 text-align-responsive' style={{}}>
            {authenticated
              ? <Signout />
              : <SigninNoMD />
            }
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
    authenticated: state.auth.authenticated
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      indexActions: bindActionCreators(indexActions, dispatch),
      userActions: bindActionCreators(userActions, dispatch),
      realtime: bindActionCreators(realtime, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
