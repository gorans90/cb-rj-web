import React, { Component } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { NewsFeed, ChannelList, Links, SearchUser } from './';
import * as userActions from '../../actions/user';
import * as chatActions from '../../actions/chat';

import './home.scss';

let queryOldState = '';
class Homepage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      height: window.innerHeight,
      searchUser: '',
      showSearchUser: false
    };

    this._onResize = this._onResize.bind(this);
  }

  _onResize () {
    this.setState({
      height: window.innerHeight
    });
  }

  componentDidMount () {
    window.addEventListener('resize', this._onResize);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._onResize);
  }

  searchUsers (queryText) {
    const { searchUserResults } = this.props;
    let query = _.toLower(queryText);
    if (!searchUserResults || (searchUserResults && searchUserResults.length === 0) || query === '' || queryOldState.length > query.length) {
      this.props.actions.userActions.startSearchUsers(query);
    } else if (searchUserResults) {
      // filter search results
      let users = Object.assign([], searchUserResults);
      users = users.filter(user => {
        let sortName = _.toLower(_.get(user, 'sortName'));
        let email = _.toLower(_.get(user, 'email'));
        return _.includes(email, query) || _.includes(sortName, query);
      });

      this.props.actions.userActions.updateSearchUserResults(users);
    }
    queryOldState = query;
  }

  addUserToChannel (channelId, userId) {
    let { channels } = this.props;
    const channel = channels.get(channelId);

    if (channel) {
      // now add this member id to channels members.
      channel.members = channel.members.set(userId, true);
      channels = channels.set(channelId, channel);
      this.props.actions.chatActions.updateChannels(channels);
    }
  }

  render () {
    const { activeChannelId } = this.props;
    const { searchUser, showSearchUser } = this.state;

    return (
      <div className='container mt-80-pt-1 full-width homepage' >
        <div className='row' style={{height: '100%'}}>
          <div className='col-md-2'>
            <Links />
          </div>
          <div className='col-md-7 news-feed'>
            <NewsFeed />
          </div>
          <div className='col-md-3 channel-list-outside'>
            <ChannelList />
            <div className='user-search'>
              <input type='text' placeholder='Type name of person...' className='user-search-input'
                value={searchUser}
                onChange={(event) => {
                  const searchUserText = _.get(event, 'target.value');
                  this.setState({
                    showSearchUser: true,
                    searchUser: searchUserText
                  }, () => {
                    this.searchUsers(searchUserText);
                  });
                }}
              />
              {showSearchUser ? <SearchUser
                onSelect={(user) => {
                  this.setState({
                    showSearchUser: false,
                    searchUser: ''
                  }, () => {
                    const userId = _.get(user, '_id');
                    this.addUserToChannel(activeChannelId, userId);
                  });
                }}
              /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  };
}

function mapStateToProps (state) {
  return {
    searchUserResults: state.userReducer.searchUserResults,
    activeChannelId: state.channelReducer.activeChannelId,
    channels: state.channelReducer.channels,
    loggedUser: state.userReducer.loggedUser
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      userActions: bindActionCreators(userActions, dispatch),
      chatActions: bindActionCreators(chatActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
