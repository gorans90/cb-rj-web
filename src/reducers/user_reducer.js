import { USER_INFO, SEARCH_USER_RESULTS, LOGGED_USER } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case USER_INFO:
      return { ...state, userInfo: action.payload };
    case SEARCH_USER_RESULTS:
      return { ...state, searchUserResults: action.payload };
    case LOGGED_USER:
      return { ...state, loggedUser: action.payload };
    default:
      return state;
  }
}
