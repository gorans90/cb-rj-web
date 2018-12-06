import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './post.scss';

import * as postAcitons from '../../actions/post';

class CreatePost extends Component {
  constructor (props) {
    super(props);

    this.state = {
      postText: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit () {
    console.log('triggered handle submit');
    const { postText } = this.state;
    this.props.actions.postAcitons.createPost({postContent: postText});
    this.setState({postText: ''});
  }

  render () {
    const { postText } = this.state;

    return (
      <div className='row create-post'>
        <div className='col-lg-10'>
          <div className='form-group'>
            <textarea className='form-control create-post-ta' rows='2' placeholder='Share something'
              onChange={event => this.setState({postText: event.target.value})}
              value={postText} />
          </div>
        </div>
        <div className='col-lg-2'>
          <button className='btn-primary' type='submit' onClick={() => this.handleSubmit()}>Post</button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      postAcitons: bindActionCreators(postAcitons, dispatch)
    }
  };
}

export default connect(null, mapDispatchToProps)(CreatePost);
