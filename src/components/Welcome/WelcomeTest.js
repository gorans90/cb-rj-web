import React, { Component } from 'react';
import {connect} from 'react-redux';
// import * as actions from '../../actions/user';
import * as actions from '../../actions/upload';
import './Welcome.scss';
import DropzoneComponent from 'react-dropzone-component';
import _ from 'lodash';
import { ChatList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

import { chatListMock } from '../../helper/mocks';
import { ChatView } from '../../components/Chat';

class Welcome extends Component {
  constructor (props) {
    super(props);

    this.state = {
      userId: false,
      pictures: []
    };

    this.getUserInfo = this.getUserInfo.bind(this);
    this.djsConfig = {
      addRemoveLinks: true,
      acceptedFiles: 'image/jpeg,image/png,image/gif',
      dictDefaultMessage: 'Click or drag here to upload images'
    };

    this.componentConfig = {
      // iconFiletypes: ['.jpg', '.png', '.gif'],
      // showFiletypeIcon: true,
      postUrl: 'no-url'
    };

    // If you want to attach multiple callbacks, simply
    // create an array filled with all your callbacks.
    this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];
    // Simple callbacks work too, of course
    this.callback = () => console.log('Hello!');
    // this.success = file => console.log('uploaded', file);
    this.success = this.success.bind(this);
    this.removedfile = this.removedfile.bind(this);
    this.dropzone = null;
    this.submitImages = this.submitImages.bind(this);
  }

  success (file) {
    console.log('~~~~uploaded~~~~', file);
    const { pictures } = this.state;
    let files = Object.assign(pictures);
    files.push(file);
    this.setState({ pictures: files });
  }

  removedfile (file) {
    console.log('removing...', file);
    const { pictures } = this.state;
    _.remove(pictures, file);
    this.setState({ pictures });
  }

  getUserInfo () {
    const {userId} = this.state;
    if (userId) {
      this.props.getUserInfo(userId);
    }
  }

  submitImages () {
    const {pictures} = this.state;
    this.props.uploadImage(pictures);
  }

  renderImages (image) {
    return (
      <img src={`data:image/jpeg;base64, ${image}`} /> // `
    );
  }

  render () {
    const { userInfo, images } = this.props;
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;

    // For a list of all possible events (there are many), see README.md!
    const eventHandlers = {
      init: this.dropzone,
      drop: this.callbackArray,
      addedfile: this.callback,
      success: this.success,
      removedfile: this.removedfile
    };

    return (
      <div>
        <h1 className='display-1 text-center' style={{marginTop: '100px'}}>Welcome to test page</h1>
        <div>
          <p>Please enter user id</p>
          <input type='number' placeholder='Please enter user id' onChange={(e) => this.setState({userId: e.target.value})} />
          <button onClick={() => this.getUserInfo()} className='btn-primary'>Get User Info</button>
        </div>
        {userInfo
          ? <div>
            <p>User email is: {userInfo.email}</p>
          </div>
          : ''}
        <div className='row'>
          <div className='col-lg-4'>
            <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
          </div>
          <div className='col-lg-4'>
            <a href='javascript:void(0)' onClick={this.submitImages}>Submit images</a><br />
            <a href='javascript:void(0)' onClick={() => this.props.gettingImageTest()}>Get image</a><br />
          </div>
        </div>
        <div className='row'>
          {images ? images.map(this.renderImages) : false}
        </div>
        <div>
          <ChatList
            className='chat-list'
            dataSource={chatListMock}
          />
        </div>
        <br />
        <ChatView />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    userInfo: state.userReducer.userInfo,
    images: state.uploadReducer.images
  };
}

export default connect(mapStateToProps, actions)(Welcome);
