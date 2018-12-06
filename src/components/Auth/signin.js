import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { required } from '../../helper/validations';
import { renderField } from '../../helper/formFieldsRender';

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
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Field
          name='username'
          {...username}
          component={renderField}
          hintText='Enter Username'
          label='Username'
          validate={required}
          ref='username'
          type='text'
          withRef
        />
        <Field
          name='password'
          {...password}
          component={renderField}
          hintText='Enter password'
          label='Password'
          validate={required}
          ref='password'
          type='password'
        />
        <button type='submit'>Sign In</button>
      </form>
    );
  }
}

function validate (formProps) {
  const errors = {};
  if (!formProps.username) {
    errors.username = 'Username address is mandatory';
  }
  if (!formProps.password) {
    errors.password = 'Password cannot be empty!';
  }
  return errors;
}

const Signin = reduxForm({
  fields: ['username', 'password'],
  form: 'signin',
  validate: validate
})(SigninForm);

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.error
  };
};

export default connect(mapStateToProps, actions)(Signin);
