import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './auth_reducer';
import countriesReducer from './countries_reducer';
import uploadReducer from './upload_reducer';
import userReducer from './user_reducer';
import postReducer from './post_reducer';
import channelReducer from './channel_reducer';

const rootReducer = combineReducers({
  form: form,
  auth: authReducer,
  countriesReducer: countriesReducer,
  uploadReducer: uploadReducer,
  userReducer: userReducer,
  postReducer: postReducer,
  channelReducer: channelReducer
});

export default rootReducer;
