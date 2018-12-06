import React, { Component } from 'react';

import { CreatePost, Posts } from '../Post';
import { ComponentLoader } from '../Loader';

class NewsFeed extends Component {
  constructor (props) {
    super(props);

    this.state = {

    };
  }

  render () {
    return (
      <div>
        <ComponentLoader />
        <CreatePost />
        <Posts />
      </div>
    );
  }
}

export default NewsFeed;
