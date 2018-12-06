import React, {Component} from 'react';

export default class SingleComment extends Component {
  render () {
    const { comment } = this.props;
    return (
      <div className='row single-comment'>
        <span className='blue-bold-text margin-right-10'>{comment.createdBy.firstName} {comment.createdBy.lastName}:</span>
        <p>{comment.content}</p>
      </div>
    );
  }
}
