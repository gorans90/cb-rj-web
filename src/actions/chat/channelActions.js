import axios from 'axios';

import _ from 'lodash';
import moment from 'moment-timezone';

import { SEARCH_USER_RESULTS, CHANNELS, OPEN_CHANNELS, ACTIVE_CHANNEL } from '../../actions/types';
import { authorizedHeaderWithUserId } from '../../actions/helper';

/* eslint-disable no-undef */
const NODE_URL = CONF.NODE_API;
/* eslint-enable no-undef */

export function createNewChannel (channel) {
  return function (dispatch) {
    axios.post(`${NODE_URL}/api/channel`, convertToJSONObject(channel))
      .then(response => {
        console.log('Successful created channel');
        const loggedUserId = _.get(channel, 'userId');
        dispatch(fetchChannels(loggedUserId));
        dispatch({ type: SEARCH_USER_RESULTS, payload: [] });
      })
      .catch(error => {
        console.error('SOmething went wrong in channel creation: ' + error);
      });
  };
}

function convertToJSONObject (channel) {
  let channelJSON = {};

  channelJSON._id = channel._id;
  channelJSON.title = channel.title;
  channelJSON.lastMessage = channel.lastMessage;
  channelJSON.userId = channel.userId;
  channelJSON.members = channel.members;
  channelJSON.messages = channel.messages;

  return channelJSON;
}

export function fetchChannels (userId) {
  return function (dispatch) {
    axios.get(`${NODE_URL}/api/me/channels`, authorizedHeaderWithUserId(userId))
      .then(response => {
        dispatch({type: CHANNELS, payload: convertChannelsToReadableObjects(_.get(response, 'data'), userId)});
      })
      .catch(error => {
        console.error('SOmething went wrong in fetch channels: ' + error);
        dispatch({type: CHANNELS, payload: []});
      });
  };
}

function convertChannelsToReadableObjects (channels, loggedUserId) {
  let data = [];

  _.each(channels, item => {
    let channel = {};
    channel.id = item._id || item.id;
    channel.title = item.title;
    channel.subtitle = item.lastMessage || item.subtitle;
    channel.unread = 0;
    channel.users = item.users;
    channel.userId = item.userId;
    channel.date = moment(item.updated || item.date);
    const user = _.find(item.users, (user) => {
      return item.userId !== user.id;
    });
    channel.avatar = user.avatar;
    channel.messages = convertMessages(item.messages, loggedUserId);

    data.push(channel);
  });

  return data;
}

export function convertMessages (messages, userId) {
  let formattedMessages = [];

  _.each(messages, message => {
    let formattedMessage = convertSingleMessage(message, userId);
    formattedMessages.push(formattedMessage);
  });

  return formattedMessages;
}

export function convertSingleMessage (message, userId) {
  let formattedMessage = {};

  formattedMessage.userId = message.userId;
  formattedMessage.me = _.toNumber(userId) === _.toNumber(formattedMessage.userId) || false;
  formattedMessage.position = formattedMessage.me ? 'right' : 'left';
  formattedMessage.type = 'text';
  formattedMessage.text = message.body || message.text;
  formattedMessage.date = new Date(message.created || message.date);

  return formattedMessage;
}

export function setOpenChannels (channels) {
  return function (dispatch) {
    dispatch({ type: OPEN_CHANNELS, payload: channels });
  };
}

export function fetchMessagesForChannel (channelId, userId, channels) {
  return function (dispatch) {
    axios.get(`${NODE_URL}/api/channels/${channelId}/messages`, authorizedHeaderWithUserId(userId)).then((response) => {
      const data = response.data;
      let messages = [];
      _.each(data, (message) => {
        let formattedMessage = onAddMessage(message, userId);
        messages.push(formattedMessage);
      });
      channels = channels.map(channel => {
        let id = _.get(channel, 'id');
        if (id === channelId) {
          channel.messages = messages;
        }
        return channel;
      });
      dispatch({type: CHANNELS, payload: convertChannelsToReadableObjects(channels, userId)});
    }).catch((err) => {
      console.log("An error fetching channel's messages", err);
    });
  };
}

function onAddMessage (payload, notify = false, currentUserId) {
  const userId = _.get(payload, 'userId');
  const messageObject = {
    _id: payload._id,
    body: _.get(payload, 'body', ''),
    userId: userId,
    channelId: _.get(payload, 'channelId'),
    created: _.get(payload, 'created', new Date()),
    me: currentUserId === userId
  };

  return messageObject;
}

export function updatedChannel (channel, channels, userId) {
  return function (dispatch) {
    let channelId = _.get(channel, 'id');
    let channelsList = [];
    _.each(channels, item => {
      if (_.get(item, 'id') === channelId) {
        channelsList.push(channel);
      } else {
        channelsList.push(item);
      }
    });
    dispatch({type: CHANNELS, payload: convertChannelsToReadableObjects(channelsList, userId)});
  };
}

export function setActiveChannel (channel) {
  return function (dispatch) {
    dispatch({ type: ACTIVE_CHANNEL, payload: channel });
  };
}
