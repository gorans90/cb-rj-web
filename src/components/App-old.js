import React, { Component } from 'react';
import '../styles/core.scss';
import { connect } from 'react-redux';
import { MuiThemeProvider, getMuiTheme, spacing } from 'material-ui/styles';
import { fade } from 'material-ui/utils/colorManipulator';
import { withRouter } from 'react-router';
import { blueGrey500, blueGrey700, white, grey600, lightBlue500, grey100, grey500, grey900, grey400, fullBlack } from 'material-ui/styles/colors';
import { AppBar, FlatButton } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import {} from 'react-router-dom';
// import MenuIcon from 'material-ui-icons/Menu';
const muiTheme = getMuiTheme({
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: blueGrey500,
    primary2Color: blueGrey700,
    primary3Color: grey400,
    accent1Color: lightBlue500,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: grey900,
    secondaryTextColor: grey600,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey400,
    disabledColor: (0, fade)(grey900, 0.3),
    pickerHeaderColor: blueGrey500,
    clockCircleColor: (0, fade)(grey900, 0.07),
    shadowColor: fullBlack
  }
});

injectTapEventPlugin();

class App extends Component {
  render () {
    let isLoggedIn = false;
    const {authenticated} = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {authenticated
            ? <AppBar
              title='CarBook'
              iconElementRight={<FlatButton label='Logout' />}
              showMenuIconButton={isLoggedIn}
            />
            : <AppBar
              title='CarBook'
              iconElementRight={<FlatButton label='Login' />}
              showMenuIconButton={isLoggedIn}
            />
          }
          { this.props.children }
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps (state) {
  return {
    authenticated: state.auth.authenticated
  };
}
const Application = connect(mapStateToProps, null)(App);
export default withRouter(Application);
