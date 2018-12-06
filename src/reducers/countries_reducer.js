import { COUNTRIES } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case COUNTRIES:
      return { ...state, countries: action.payload };
    default:
      return state;
  }
}
