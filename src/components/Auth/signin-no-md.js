import React, { Component } from 'react';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../../actions';
// import {required} from '../../helper/validations';
import './auth.scss';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <fieldset className='username-password-575'>
    <input {...input} placeholder={label} type={type} className={''} autoComplete={type === 'password' ? 'new-password' : 'off'} />
    {/* <div className='form-control-feedback'>{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</div> */}
  </fieldset>
);

class SigninForm extends Component {
  constructor (props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit ({ username, password }) {
    this.props.signin({ username, password });
  }

  render () {
    const {handleSubmit, fields: { username, password }} = this.props;

    return (
      <div className='login-form row'>
        <div className='col-md-12'>
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <div className='col-md-5 left-input-padd'>
              <label>Username</label>
              <Field name='username'
                // label='Username'
                {...username}
                component={renderField}
                className='' />
            </div>

            <div className='col-md-5 left-input-padd'>
              <label>Password</label>
              <Field name='password'
                // label='Password'
                {...password}
                component={renderField}
                type='password'
                className='' />
            </div>

            <div className='login-btn-div'>
              <button action='submit' className='login-btn'>Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const Signin = reduxForm({
  form: 'signin',
  fields: ['username', 'password']
})(SigninForm);

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.error
  };
};

export default connect(mapStateToProps, actions)(Signin);
