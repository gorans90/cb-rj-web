import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import Welcome, {WelcomeTest} from './components/Welcome';
import ErrorPage from './components/ErrorPage';
import { Home, Homepage } from './components/Home';
import { Authenticate } from './components/Auth';

import { ROOT_ROUTE, SIGNIN_ROUTE, TEST_PATH, HOME_ROUTE } from './helper/routes';
import { TOKEN } from './helper/constants';

import { AUTH_USER } from './actions/types';
import storeProvider from './storeProvider';

import reducers from './reducers';
import jquery from 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';

// ========================================================
// Store Instantiation
// ========================================================

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const configureStore = () => createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); ;
storeProvider.init(configureStore);
const store = storeProvider.getStore();
// const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

let token = sessionStorage.getItem(TOKEN);
if (token) {
  store.dispatch({ type: AUTH_USER });
}

const history = createBrowserHistory();
window.browserHistory = history;
window.jQuery = jquery;
// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');
let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App>
          <Switch>
            <Route exact path={ROOT_ROUTE} component={Authenticate(Home)} />
            <Route exact path={TEST_PATH} component={WelcomeTest} />
            <Route exact path={SIGNIN_ROUTE} component={Authenticate(Welcome)} />
            <Route exact path={HOME_ROUTE} component={Home} />
            <Route path='/homepage' component={Homepage} />
            <Route exact component={ErrorPage} />
          </Switch>
        </App>
      </Router>
    </Provider>
    , MOUNT_NODE);
};
// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        console.error(error);
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./components/App', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      })
    );
  }
}

// ========================================================
// Go!
// ========================================================
render();
