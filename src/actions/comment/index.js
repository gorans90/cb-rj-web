import axios from 'axios';

import { REQUEST_SENT, RESPONSE_RECEIVED } from '../types';

import { ROOT_URL } from '../../helper/constants';
import * as helperMethods from '../helper';

import * as postActions from '../post';

export function createComment ({commentText, user, post}) {
  return function (dispatch) {
    dispatch({type: REQUEST_SENT});
    if (!user) {
      // if user is not sent default it to user with id 2, for now
      user = {};
      user.id = 2;
    }

    axios.post(`${ROOT_URL}/comment/create`, createCommentJSONObject({commentText, user, post}), helperMethods.authorizedHeader())
      .then(response => {
        console.log('Successfully created comment');
        dispatch(postActions.getPostById(post.id, true));
        dispatch({type: RESPONSE_RECEIVED});
      })
      .catch(error => {
        console.log('Error during creating comment: ', error);
        dispatch({type: RESPONSE_RECEIVED});
      });
  };
}

function createCommentJSONObject ({ commentText, user, post }) {
  let data = {};

  data.createdBy = user;
  data.content = commentText;
  data.dateCreated = new Date();
  data.postDTO = post;

  return data;
}
