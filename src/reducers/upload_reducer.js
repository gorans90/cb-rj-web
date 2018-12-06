import { IMAGE_BYTES } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case IMAGE_BYTES:
      return { ...state, images: action.payload };
    default:
      return state;
  }
}
