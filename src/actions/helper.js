import axios from 'axios';
import _ from 'lodash';

import { COUNTRIES } from './types';
import { TOKEN } from '../helper/constants';
import storeProvider from '../storeProvider';

/* eslint-disable no-undef */
// const ROOT_URL = CONF.API;
const COUNTRIES_API = CONF.COUNTRIES_API;
/* eslint-enable no-undef */

export function fetchCountries () {
  return function (dispatch) {
    axios.get(`${COUNTRIES_API}`)
      .then(response => {
        dispatch({type: COUNTRIES, payload: response.data});
      })
      .catch(error => {
        console.log('error during the fetching countries', error);
        dispatch({type: COUNTRIES, payload: false});
      });
  };
}

export function imageUploadHeader () {
  return {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=--imageUpload',
      'Accept': 'text/plain'
    }
  };
}

export function authorizedHeader () {
  let token = sessionStorage.getItem(TOKEN);
  if (!token) {
    token = localStorage.getItem(TOKEN);
  }
  return {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
}

export function authorizedHeaderWithUserId (id) {
  let token = sessionStorage.getItem(TOKEN);
  if (!token) {
    token = localStorage.getItem(TOKEN);
  }
  return {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'userId': id
    }
  };
}

export function getLoggedInUser () {
  const state = storeProvider.getStore().getState();
  const { userReducer } = state;
  return _.get(userReducer, 'loggedUser');
}

export function getActiveChannel () {
  const state = storeProvider.getStore().getState();
  const { channelReducer } = state;
  return _.get(channelReducer, 'activeChannel');
}

export function getChannels () {
  const state = storeProvider.getStore().getState();
  const { channelReducer } = state;
  return _.get(channelReducer, 'channels');
}
