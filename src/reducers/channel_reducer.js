import { ACTIVE_CHANNEL, CHANNELS, OPEN_CHANNELS } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case ACTIVE_CHANNEL:
      return { ...state, activeChannel: action.payload };
    case CHANNELS:
      return { ...state, channels: action.payload };
    case OPEN_CHANNELS:
      return { ...state, openChannels: action.payload };
    default:
      return state;
  }
}
