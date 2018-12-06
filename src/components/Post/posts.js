import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import * as postAcitons from '../../actions/post';

import SinglePost from './single_post';

class Posts extends Component {
  constructor (props) {
    super(props);

    this.renderSinglePost = this.renderSinglePost.bind(this);
  }

  componentWillMount () {
    this.props.actions.postAcitons.getRecentPosts();
  }

  renderSinglePost (post) {
    const { updatedPost } = this.props;
    let postForRender = post;
    if (updatedPost && post.id === updatedPost.id) {
      postForRender = updatedPost;
    }
    return (
      <SinglePost key={_.get(postForRender, 'id')} post={postForRender} />
    );
  }

  render () {
    const { recentPosts } = this.props;
    return (
      <div className='row'>
        {recentPosts ? recentPosts.map(this.renderSinglePost) : <div />}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    recentPosts: state.postReducer.recent_posts,
    updatedPost: state.postReducer.updated_post
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      postAcitons: bindActionCreators(postAcitons, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
