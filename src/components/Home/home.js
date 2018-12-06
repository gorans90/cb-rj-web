import React, { Component } from 'react';

import './home.scss';

import { Posts, CreatePost } from '../Post';
import { ComponentLoader } from '../Loader';

export default class Home extends Component {
  render () {
    return (
      <div className='container homepage'>
        <ComponentLoader />
        <div className='content'>
          <h1 className='display-1 text-center'>Home page</h1>
          <CreatePost />
          <Posts />
        </div>
      </div>
    );
  }
}
