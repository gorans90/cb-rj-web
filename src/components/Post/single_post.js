import React, { Component } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import { CreateComment, SingleComment } from '../Comment';

class SinglePost extends Component {
  constructor (props) {
    super(props);

    this.renderSingleComment = this.renderSingleComment.bind(this);
  }

  renderSingleComment (comment) {
    return (
      <div className='row no-margin-left'>
        <SingleComment key={_.get(comment, 'id')} comment={comment} />
      </div>
    );
  }

  render () {
    const { post } = this.props;
    const { commentDTOs } = post;
    return (
      <div className='single-post col-lg-11'>
        <span className='blue-bold-text'>{post.createdBy.firstName} {post.createdBy.lastName}</span>
        <p>{post.content}</p>
        <div className='comments'>
          {commentDTOs ? <div className='row no-margin-left'>
            <b>Comments</b>
          </div> : false}
          {commentDTOs ? commentDTOs.map(this.renderSingleComment) : false}
          <CreateComment post={post} />
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {};
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {

    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
