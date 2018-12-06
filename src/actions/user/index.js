import axios from 'axios';
import _ from 'lodash';
// import {OrderedMap} from 'immutable';

import { USER_INFO, REQUEST_SENT, RESPONSE_RECEIVED, SEARCH_USER_RESULTS, LOGGED_USER } from '../types';
import * as helperMethods from '../helper';

// import * as helperActions from '../helper';

/* eslint-disable no-undef */
const ROOT_URL = CONF.API;
const NODE_URL = CONF.NODE_API;
/* eslint-enable no-undef */

export function getUserInfo (userId, loggedIn) {
  return function (dispatch) {
    dispatch({type: REQUEST_SENT});
    axios.get(`${ROOT_URL}/user/${userId}`, helperMethods.authorizedHeader())
      .then(response => {
        if (loggedIn) {
          dispatch({type: LOGGED_USER, payload: response.data.message});
        } else {
          dispatch({type: USER_INFO, payload: response.data.message});
        }
        dispatch({type: RESPONSE_RECEIVED});
      })
      .catch(error => {
        console.log('something went wrong: ', error);
        dispatch({type: RESPONSE_RECEIVED});
      });
  };
}

export function registration ({ firstName, lastName, username, email, password, dateOfBirth, gender }) {
  return function (dispatch) {
    dispatch({type: REQUEST_SENT});
    axios.post(`${ROOT_URL}/user/create/`, convertToJsonObject(
      firstName, lastName, username, email, password, dateOfBirth, gender
    ), helperMethods.authorizedHeader())
      .then(response => {
        console.log('uspesno registrovan user');
        const id = _.get(response, 'data.message.id');
        dispatch(mongoDbRegistration(id, firstName, lastName, `${firstName} ${lastName}`, email));
        dispatch({type: RESPONSE_RECEIVED});
      })
      .catch(error => {
        console.log('neuspesno registrovan user ', error);
        dispatch({type: RESPONSE_RECEIVED});
      });
  };
}

export function mongoDbRegistration (firstName, lastName, sortName, email) {
  return function (dispatch) {
    axios.post(`${NODE_URL}/api/users`, convertToNodeJsonObject(firstName, lastName, sortName, email))
      .then(response => {
        console.log('Successfully added user to the mongo db.');
      })
      .catch(error => {
        console.log('Something went wrong during registration user to mongo db.', error);
      });
  };
}

function convertToJsonObject (firstName, lastName, username, email, password, dateOfBirth, gender) {
  let data = {};

  data.firstName = firstName;
  data.lastName = lastName;
  data.username = username;
  data.email = email;
  data.password = password;
  data.dateOfBirth = dateOfBirth.toDate();
  data.gender = gender;

  return data;
};

function convertToNodeJsonObject (id, firstName, lastName, sortName, email) {
  let data = {};

  data.id = id;
  data.firstName = firstName;
  data.lastName = lastName;
  data.sortName = sortName;
  data.email = email;
  data.avatar = 'https://static-s.aa-cdn.net/img/ios/1102227408/4a7cef43d8bcb7f9e9ed7e238b19311d?v=1'; // default avatar
  data.online = false;

  return data;
};

export function startSearchUsers (query) {
  return function (dispatch) {
    if (query !== undefined && query.length === 0) {
      dispatch({ type: SEARCH_USER_RESULTS, payload: [] });
      return;
    }
    const data = {search: query};
    axios.post(`${NODE_URL}/api/users/search`, data).then((response) => {
      const usersResult = _.get(response, 'data', []);
      dispatch({ type: SEARCH_USER_RESULTS, payload: usersResult });
    }).catch((err) => {
      console.log('searching errror', err);
      dispatch({ type: SEARCH_USER_RESULTS, payload: [] });
    });
  };
}

export function updateSearchUserResults (users) {
  return function (dispatch) {
    dispatch({ type: SEARCH_USER_RESULTS, payload: users });
  };
}
