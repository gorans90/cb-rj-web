import _ from 'lodash';

import * as helperActions from '../../actions/helper';
import * as channelActions from '../../actions/chat/channelActions';

/* eslint-disable no-undef */
const WEBSOCKET_URL = CONF.WEBSOCKET_URL;
/* eslint-enable no-undef */

let ws = null;
let isConnected = false;
let authSent = false;

export function connect () {
  const wss = new WebSocket(WEBSOCKET_URL);
  ws = wss;
  return function (dispatch) {
    ws.onopen = () => {
      isConnected = true;

      authentication();

      ws.onmessage = (event) => {
        let data = _.get(event, 'data');
        dispatch(readMessage(data));
        console.log('Message from the server: ' + data);
      };
    };

    ws.onclose = () => {
      isConnected = false;
    };

    ws.onerror = () => {
      isConnected = false;
    };
  };
}

export function reconnect () {
  window.setInterval(() => {
    if (!authSent) {
      authentication();
    }
    if (!isConnected) {
      const user = helperActions.getLoggedInUser();
      if (user) {
        console.log('try to reconnect!');
        authSent = false;
        connect();
      }
    }
  }, 3000);
}

export function authentication () {
  const currentUser = helperActions.getLoggedInUser();
  const currentUserId = _.toString(_.get(currentUser, 'id'));
  if (currentUserId) {
    authSent = true;
    const message = {
      action: 'auth',
      payload: `${currentUserId}`
    };
    send(message);
  }
}

export function send (msg = {}) {
  const connected = isConnected;
  if (ws && connected) {
    const msgString = JSON.stringify(msg);
    ws.send(msgString);
  }
}

export function readMessage (msg) {
  return function (dispatch) {
    const currentUser = helperActions.getLoggedInUser();
    const currentUserId = _.toString(_.get(currentUser, 'id'));
    const message = decodeMessage(msg);
    const action = _.get(message, 'action', '');
    const payload = _.get(message, 'payload');
    switch (action) {
      case 'message_added':
        const activeChannel = helperActions.getActiveChannel();
        let notify = _.get(activeChannel, 'id') !== _.get(payload, 'channelId') && currentUserId !== _.get(payload, 'userId');
        dispatch(onAddMessage(payload, notify));
        break;
      default:
        break;
    }
  };
}

export function decodeMessage (msg) {
  let message = {};

  try {
    message = JSON.parse(msg);
  } catch (err) {
    console.log(err);
  }

  return message;
}

export function onAddMessage (payload, notify = false) {
  return function (dispatch) {
    const currentUser = helperActions.getLoggedInUser();
    const currentUserId = _.toString(_.get(currentUser, 'id'));
    const activeChannel = helperActions.getActiveChannel();

    let user = _.get(payload, 'user');

    const messageObject = {
      _id: payload._id,
      body: _.get(payload, 'body', ''),
      userId: _.get(payload, 'userId'),
      channelId: _.get(payload, 'channelId'),
      created: _.get(payload, 'created', new Date()),
      me: currentUserId === _.toString(_.get(payload, 'userId')),
      user: user
    };
    activeChannel.messages.push(messageObject /*, _.get(user, 'id') */);
    dispatch(channelActions.updatedChannel(activeChannel, helperActions.getChannels(), currentUserId));
  };
}
