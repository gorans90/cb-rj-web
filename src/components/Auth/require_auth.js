import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIGNIN_ROUTE } from '../../helper/routes';
// import createHistory from 'history/createBrowserHistory';
// const history = createHistory();

export default function (ComposedComponent) {
  class Authentication extends Component {
    // static propTypes = {
    //   routes: PropTypes.array.isRequired
    // };

    componentWillMount () {
      const {authenticated} = this.props;
      if (!authenticated) {
        window.browserHistory.push(SIGNIN_ROUTE);
        // history.push({pathname: SIGNIN_ROUTE});
        // window.dispatchEvent(new window.PopStateEvent('popstate'));
      }
    }

    // componentWillUpdate (nextProps) {
    //   if (!nextProps.authenticated) {
    //     window.browserHistory.push(SIGNIN_ROUTE);
    //     // history.push({pathname: SIGNIN_ROUTE});
    //     // window.dispatchEvent(new window.PopStateEvent('popstate'));
    //   }
    // }

    render () {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps (state) {
    return {
      authenticated: state.auth.authenticated
    };
  }

  return connect(mapStateToProps, null)(Authentication);
}
