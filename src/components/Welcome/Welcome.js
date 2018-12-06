import React, { Component } from 'react';

import {connect} from 'react-redux';
// import ImageUploader from 'react-images-upload';

import * as actions from '../../actions/upload';

import Registration from '../Registration';
import { FullScreenLoader } from '../Loader';

import './Welcome.scss';
// import {Link} from 'react-router-dom';
// import {TEST_PATH} from '../../helper/routes';

class Welcome extends Component {
  constructor () {
    super();
    this.state = {
      pictures: {}
    };

    this.onChange = this.onChange.bind(this);
    this.submitImages = this.submitImages.bind(this);
  }

  onChange (pictures) {
    this.setState({
      pictures: pictures
    });
  }

  onFileLoad (event, file) {
    console.log(event.target.result, file.name);
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
    // const { images } = this.props;
    return (
      <div>
        <FullScreenLoader />
        <Registration />
        {/*
        <ImageUploader
          withIcon
          buttonText='Choose images'
          onChange={this.onChange}
          imgExtension={['.jpg', '.gif', '.png', '.gif', '.PNG', '.MOV', '.mov', '.mp4', '.MP4']}
          maxFileSize={15242880}
        />

        <Link to={TEST_PATH}>
          <p>GO TO TEST PAGE</p>
        </Link>
         <Upload label='Add' onFileLoad={this.onFileLoad} />
        <UploadPreview
          title='Picture'
          label='Add'
          initialItems={this.state.pictures}
          onChange={this.onChange}
        /> ]*}
        <a href='javascript:void(0)' onClick={() => this.props.gettingImageTest()}>Get image</a>
        <a href='javascript:void(0)' onClick={this.submitImages}>Submit images</a><br />
      {images ? images.map(this.renderImages) : false} */}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    images: state.uploadReducer.images
  };
}

export default connect(mapStateToProps, actions)(Welcome);
