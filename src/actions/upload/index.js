import axios from 'axios';
import * as helperActions from '../helper';
import { IMAGE_BYTES } from '../types';

/* eslint-disable no-undef */
const ROOT_URL = CONF.API;
/* eslint-enable no-undef */

export function uploadImage (files) {
  return function (dispatch) {
    var formData = new FormData();
    formData.append('carProfile', 1);
    // formData.append('projectId', 1);

    if (files.length > 1) {
      for (var i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
      axios.post(`${ROOT_URL}/upload/multiple/`, formData, helperActions.imageUploadHeader());
    } else {
      formData.append('file', files[0]);
      axios.post(`${ROOT_URL}/upload/single/`, formData, helperActions.imageUploadHeader());
    }
  };
}

export function gettingImageTest () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/upload/get-image/1`)
      .then(response => {
        console.log('cool radi, ', response);
        let images = Object.assign([], response.data);
        dispatch({ type: IMAGE_BYTES, payload: images });
      })
      .catch(error => {
        console.log('ne valja, ', error);
      });
  };
}

// function convertToImageBody (image) {
//   return {
//     '--imageUpload'
//     'Content-Disposition': 'form-data; name="file"; filename=${image.filename}'
//     'Content-Type': 'image/png'
//     '--imageUpload--'
//   };
// }
