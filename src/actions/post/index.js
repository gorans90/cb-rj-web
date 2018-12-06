import axios from 'axios';

import { RECENT_POSTS, UPDATED_POST, POST, REQUEST_SENT, RESPONSE_RECEIVED } from '../types';

import { ROOT_URL } from '../../helper/constants';
import * as helperMethods from '../helper';

export function createPost ({postContent, user}) {
  return function (dispatch) {
    dispatch({type: REQUEST_SENT});
    if (!user) {
      // if user is not sent default it to user with id 4, for now
      user = {};
      user.id = 4;
    }
    axios.post(`${ROOT_URL}/post/create`, createPostJSONObject(postContent, user), helperMethods.authorizedHeader())
      .then(response => {
        console.log('Successfully created post');
        dispatch(getRecentPosts());
        dispatch({type: RESPONSE_RECEIVED});
      })
      .catch(error => {
        console.log('Error during post creation: ', error);
        dispatch({type: RESPONSE_RECEIVED});
      });
  };
}

function createPostJSONObject (postContent, user) {
  let data = {};

  data.createdBy = user;
  data.content = postContent;
  data.dateCreated = new Date();

  return data;
}

export function getRecentPosts () {
  return function (dispatch) {
    dispatch({type: REQUEST_SENT});
    // 4 represent the user id, in the futur it wll be dinamic caught
    axios.get(`${ROOT_URL}/post/get/user/4`, helperMethods.authorizedHeader())
      .then(response => {
        console.log('Successfully get recent posts', response.data.message);
        dispatch({type: RECENT_POSTS, payload: response.data.message});
        dispatch({type: UPDATED_POST, payload: false});
        dispatch({type: RESPONSE_RECEIVED});
      })
      .catch(error => {
        console.log('Something went wrong in get recent posts', error);
        dispatch({type: RECENT_POSTS, payload: false});
        dispatch({type: UPDATED_POST, payload: false});
        dispatch({type: RESPONSE_RECEIVED});
      });
  };
}

export function getPostById (postId, updated) {
  return function (dispatch) {
    dispatch({type: REQUEST_SENT});
    axios.get(`${ROOT_URL}/post/get/${postId}`, helperMethods.authorizedHeader())
      .then(response => {
        console.log('Successfully get post by id', response.data.message);
        dispatch({type: updated ? UPDATED_POST : POST, payload: response.data.message});
        dispatch({type: RESPONSE_RECEIVED});
      })
      .catch(error => {
        console.log('Something went wrong in  get post by id', error);
        dispatch({type: updated ? UPDATED_POST : POST, payload: false});
        dispatch({type: RESPONSE_RECEIVED});
      });
  };
}
