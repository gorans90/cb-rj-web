import React, { Component } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
import { OrderedMap } from 'immutable';
import { bindActionCreators } from 'redux';

import * as channelActions from '../../actions/chat/channelActions';
import { ObjectID } from '../../helper/objectid';

class SearchUser extends Component {
  constructor (props) {
    super(props);

    this.createChannel = this.createChannel.bind(this);
  }

  createChannel (user) {
    const { currentUser } = this.props;
    const currentUserId = _.get(currentUser, 'id');

    const channelId = new ObjectID().toString();
    const channel = {
      _id: channelId,
      title: '',
      lastMessage: '',
      members: new OrderedMap(),
      messages: new OrderedMap(),
      isNew: true,
      userId: currentUserId,
      created: new Date()
    };

    const addedUserId = _.get(user, 'id');
    const firstUserName = _.get(user, 'sortName');
    const loggedUserName = _.get(currentUser, 'firstName');
    const loggedUserLastName = _.get(currentUser, 'lastName');
    channel.members = channel.members.set(addedUserId, true);
    channel.members = channel.members.set(currentUserId, true);
    channel.title = `${firstUserName}, ${loggedUserName} ${loggedUserLastName}`;

    this.props.actions.channelActions.createNewChannel(channel);
  }

  render () {
    const { searchUserResults } = this.props;

    return (
      <div className='search-user'>
        <div className='user-list'>
          {searchUserResults ? searchUserResults.map((user, index) => {
            return (
              <div onClick={() => this.createChannel(user)} key={index} className='user'>
                <img src={_.get(user, 'avatar')} alt='...' />
                <h2>{_.get(user, 'sortName')}</h2>
              </div>
            );
          }) : ''}
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    searchUserResults: state.userReducer.searchUserResults,
    currentUser: state.userReducer.loggedUser
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      channelActions: bindActionCreators(channelActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);
