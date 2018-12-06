import { RECENT_POSTS, UPDATED_POST, POST } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case RECENT_POSTS:
      return { ...state, recent_posts: action.payload };
    case UPDATED_POST:
      return { ...state, updated_post: action.payload };
    case POST:
      return { ...state, single_post: action.payload };
    default:
      return state;
  }
}
