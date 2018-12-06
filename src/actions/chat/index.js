import { CHANNELS } from '../types';

export function updateChannels (channels) {
  return function (dispatch) {
    dispatch({ type: CHANNELS, payload: channels });
  };
}
