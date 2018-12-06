import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../actions';

import Header from './Header';
import Footer from './Footer';
// import Registration from './Registration';

import { SIGNIN_ROUTE } from '../helper/routes';

import '../styles/core.scss';
import '../styles/example.scss';
import '../styles/filepicker.scss';
import '../../node_modules/dropzone/dist/min/dropzone.min.css';
import background from '../images/bg.jpg';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }
  componentWillMount () {
    if (this.props.verify) { // If verify token flag is up, refresh it
      // this.props.refreshUserToken();
    }
  }

  componentDidCatch (error, errorInfo) {
    console.error('*************** Error raised with this exception: ', error, errorInfo);
    this.setState({hasError: true, errorMessage: `${error}: ${JSON.stringify(errorInfo)}`});
  }

  render () {
    // let isLoggedIn = false;
    // const {authenticated} = this.props;
    const { pathname } = window.location;
    let style = {
      height: '100%',
      position: 'relative',
      backgroundImage: pathname === SIGNIN_ROUTE ? `url(${background})` : 'none',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    };
    return (
      <div style={style}>
        <Header />
        {/* <Registration /> */}
        { this.props.children }
        {pathname === SIGNIN_ROUTE
          ? <Footer />
          : <div />
        }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
  };
}

const Application = connect(mapStateToProps, actions)(App);
export default withRouter(Application);
