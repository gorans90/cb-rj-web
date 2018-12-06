import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ChatList } from 'react-chat-elements';
import _ from 'lodash';
import { OrderedMap } from 'immutable';

import * as channelActions from '../../actions/chat/channelActions';
import { ChatView } from '../../components/Chat';
import { MAX_DISPLAYED_CHATS } from '../../helper/constants';

let chatCounter = 1;
class ChannelList extends Component {
  constructor (props) {
    super(props);

    this.state = {
      chats: new OrderedMap()
    };
  }

  handleOnClick (item) {
    let { chats } = this.state;
    const { loggedUser, channels } = this.props;
    let alreadyExists = false;
    let itemId = _.get(item, 'id');
    const loggedUserId = _.get(loggedUser, 'id');

    chats.forEach(element => {
      let chat = _.get(element, 'props.chat');
      let chatId = _.get(chat, 'id');
      if (chatId === itemId) {
        alreadyExists = true;
      }
    });

    if (!alreadyExists) {
      item.no = chatCounter;
      if (chatCounter > MAX_DISPLAYED_CHATS) {
        // if we have more than expected chat override oldest one
        chatCounter = 1;
        item.no = 1;
      }
      chats = chats.set(chatCounter, <ChatView key={chatCounter} chat={item} onClose={(itemNo) => this.handleOnClose(itemNo)} />);
      chatCounter++;
      this.setState({ chats });
      this.props.actions.channelActions.fetchMessagesForChannel(itemId, loggedUserId, channels);
      this.props.actions.channelActions.setActiveChannel(item);
    }
  }

  handleOnClose (itemNo) {
    let { chats } = this.state;
    console.log('itemNo: ' + itemNo + 'chats size: ' + _.get(chats, 'size'));

    chats = chats.remove(itemNo);

    let newChatList = new OrderedMap();

    chats = chats.map(element => {
      let chat = _.get(element, 'props.chat');
      let chatNo = _.get(chat, 'no');
      if (chatNo > itemNo) {
        chat.no = --chatNo;
      }
      newChatList = newChatList.set(chat.no, <ChatView key={chat.no} chat={chat} onClose={(itemNum) => this.handleOnClose(itemNum)} />);
      return newChatList;
    });

    this.setState({ chats: newChatList });
    chatCounter--;
  }

  render () {
    const { loggedUser, channels } = this.props;
    const { chats } = this.state;
    const userId = _.get(loggedUser, 'id');

    if (loggedUser && !channels) {
      this.props.actions.channelActions.fetchChannels(userId);
    }
    return (
      <div className='channel-list'>
        <ChatList
          className='channel-list'
          dataSource={channels || []}
          onClick={(item) => this.handleOnClick(item)}
        />
        {chats.valueSeq()}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    loggedUser: state.userReducer.loggedUser,
    channels: state.channelReducer.channels,
    openChannels: state.channelReducer.openChannels
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      channelActions: bindActionCreators(channelActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
