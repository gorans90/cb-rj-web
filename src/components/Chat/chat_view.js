import React, { Component } from 'react';

import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';

// import { messageListMock } from '../../helper/mocks';
import { MessageList, Input } from 'react-chat-elements';

import './chat.scss';
import { CHAT_OFFSET, CHAT_WIDTH } from '../../helper/constants';
import { ObjectID } from '../../helper/objectid';
import * as channelActions from '../../actions/chat/channelActions';
import * as realtime from '../../actions/realtime/realtime';

class ChatView extends Component {
  constructor (props) {
    super(props);

    this.state = {
      openChat: true
    };

    this.handleOpenCloseChat = this.handleOpenCloseChat.bind(this);
  }

  handleOpenCloseChat () {
    const { openChat } = this.state;
    this.setState({ openChat: !openChat });
  }

  handleSend () {
    const { newMessage } = this.state;
    const { currentUser, chat } = this.props;
    // create new message
    if (_.trim(newMessage).length) {
      const messageId = new ObjectID().toString();
      const channelId = _.get(chat, 'id', null);

      const message = {
        _id: messageId,
        channelId: channelId,
        body: newMessage,
        userId: _.get(currentUser, 'id'),
        me: true,
        date: new Date()
      };

      this.addMessage(messageId, message);

      this.refs.chatinput.clear();

      this.setState({
        newMessage: ''
      });
    }
  }

  addMessage (id, message = {}) {
    const { currentUser, channels } = this.props;
    // we need add user object who is author of this message
    message.user = currentUser;

    // let's add new message id to current channel->messages.
    const channelId = _.get(message, 'channelId');
    let channel;
    let filteredChannel;
    if (channelId) {
      filteredChannel = channels.filter(item => {
        return _.get(item, 'id') === channelId;
      });

      if (!filteredChannel[0]) {
        return;
      }

      channel = filteredChannel[0];
      channel.lastMessage = _.get(message, 'body', '');

      // send to the server via websocket to creawte new message and notify to other members.
      realtime.send(
        {
          action: 'create_message',
          payload: message
        }
      );
      channel.messages.push(message);
      channel.isNew = false;
      this.props.actions.channelActions.updatedChannel(channel, channels, _.get(currentUser, 'id'));
    }
  }

  calculateRightPosition (itemNo) {
    let rightPos = 0;

    if (itemNo && itemNo > 1) {
      rightPos = (itemNo - 1) * CHAT_WIDTH + CHAT_OFFSET * (itemNo - 1);
    }

    return rightPos;
  }

  render () {
    const { openChat } = this.state;
    const { chat, onClose, channels } = this.props;

    const chatNo = _.get(chat, 'no');
    const chatId = _.get(chat, 'id');
    let messages = [];
    _.each(channels, channel => {
      let channelId = _.get(channel, 'id');
      if (channelId === chatId) {
        messages = Object.assign([], _.get(channel, 'messages'));
      }
    });
    const rightPos = this.calculateRightPosition(chatNo);

    return (
      <div className='chat-view' style={{ right: `${rightPos}px` }} onFocus={() => { this.props.actions.channelActions.setActiveChannel(chat); }}> {/* ` */}
        <div className='chat-title pointer'><h5 onClick={() => this.handleOpenCloseChat()}>{_.get(chat, 'title')}</h5><h4 onClick={() => { onClose(chatNo); }}>X</h4></div>
        {openChat
          ? <div>
            <MessageList
              className='message-list'
              lockable
              toBottomHeight={'100%'}
              dataSource={messages}
            />
            <Input
              // multiline
              // autoHeight={false}
              ref='chatinput'
              placeholder='Type here...'
              onKeyUp={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  this.handleSend();
                }
              }} onChange={(event) => {
                this.setState({newMessage: _.get(event, 'target.value')});
              }}
            />
          </div>
          : <div />
        }
      </div>
    );
  };
}

function mapStateToProps (state) {
  return {
    currentUser: state.userReducer.loggedUser,
    channels: state.channelReducer.channels
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      channelActions: bindActionCreators(channelActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatView);
