import { AUTH_USER, UNAUTH_USER, REQUEST_SENT, RESPONSE_RECEIVED, RESET_LOADER, REALTIME } from '../actions/types';

export default function (state = {}, action) {
  let loading = 0;
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case REQUEST_SENT:
      loading = state.requestProcessing || 0;
      loading += 1;
      return { ...state, requestProcessing: loading };
    case RESPONSE_RECEIVED:
      loading = state.requestProcessing || 0;
      if (loading > 0) {
        loading -= 1;
      }
      return { ...state, requestProcessing: loading };
    case REALTIME:
      return { ...state, realtime: action.payload };
    case RESET_LOADER:
      return { ...state, requestProcessing: 0 };
    default:
      return state;
  }
}
