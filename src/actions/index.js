import axios from 'axios';
import { AUTH_USER, UNAUTH_USER, REQUEST_SENT, RESPONSE_RECEIVED } from './types';
import { ROOT_ROUTE, SIGNIN_ROUTE } from '../helper/routes';
import createHistory from 'history/createBrowserHistory';
import {TOKEN} from '../helper/constants';
import * as userActions from './user';
import _ from 'lodash';

const history = createHistory();

/* eslint-disable no-undef */
const ROOT_URL = CONF.API;
/* eslint-enable no-undef */

export function apiUrl () {
  return function (dispatch) {
    console.log(ROOT_URL);
  };
}

export function signin ({ username, password }) {
  return function (dispatch) {
    dispatch({type: REQUEST_SENT});
    var config = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json'
      }
    };
    let jsonRequest = { 'username': username, 'password': password };
    axios.post(`${ROOT_URL}/v0/auth/login`,
      jsonRequest,
      config)
      .then(response => {
        dispatch({type: AUTH_USER});
        sessionStorage.setItem(TOKEN, response.data.message.token);
        history.push({ pathname: ROOT_ROUTE });
        const userId = _.get(response, 'data.message.userId');
        sessionStorage.setItem('user_id', userId);
        dispatch(userActions.getUserInfo(userId, true));
        window.dispatchEvent(new window.PopStateEvent('popstate'));
        dispatch({type: RESPONSE_RECEIVED});
      })
      .catch(error => {
        console.log('login error', error);
        dispatch({type: RESPONSE_RECEIVED});
      });
  };
}

export function signoutUser () {
  localStorage.removeItem(TOKEN);
  sessionStorage.removeItem(TOKEN);
  window.location.pathname = SIGNIN_ROUTE;
  return {
    type: UNAUTH_USER
  };
}
