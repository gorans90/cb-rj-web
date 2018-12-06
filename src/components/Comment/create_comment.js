import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as commentActions from '../../actions/comment';

import './comment.scss';

class CreateComment extends Component {
  constructor (props) {
    super(props);

    this.state = {
      commentText: ''
    };

    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  handleCommentSubmit () {
    const { commentText } = this.state;
    const { post } = this.props;
    this.props.actions.commentActions.createComment({commentText, post});
    this.setState({ commentText: '' });
  }

  render () {
    const { commentText } = this.state;
    return (
      <div className='row'>
        <div className='col-lg-8'>
          <textarea className='form-control create-comment-ta' rows='1' placeholder='Add Comment'
            onChange={event => this.setState({commentText: event.target.value})}
            value={commentText} />
        </div>
        <div className='col-lg-2 create-comment-btn'>
          <button className='btn-primary' type='submit' onClick={() => this.handleCommentSubmit()}>Add comment</button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      commentActions: bindActionCreators(commentActions, dispatch)
    }
  };
}

export default connect(null, mapDispatchToProps)(CreateComment);
