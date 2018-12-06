import React, { Component } from 'react';

import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actions from '../../actions/user';

import { renderField } from '../../helper/formFieldsRender';
import { required } from '../../helper/validations';

import maleIcon from '../../images/mcb.png';
import maleRedIcon from '../../images/mcb-red.png';
import femaleIcon from '../../images/fcb.png';
import femaleRedIcon from '../../images/fcb-red.png';

class RegistrationForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      male: false,
      female: false
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit ({ firstName, lastName, username, email, password, day, month, year }) {
    const { male, female } = this.state;
    let dateOfBirth = moment().year(year).month(month).date(day);
    let gender = male || female;
    this.props.registration({firstName, lastName, username, email, password, dateOfBirth, gender});
  }

  render () {
    const {handleSubmit, fields: { firstName, lastName, username, email, password, day, month, year }} = this.props;
    const { male, female } = this.state;

    return (
      <div className='row'>
        <div className='col-sm-12 registration-form'>
          <form onSubmit={handleSubmit(this.handleFormSubmit)} className='height-100'>
            <div className='col-md-6 text-center'>
              <div className='row input-parent-575'>
                <Field
                  name='firstName'
                  {...firstName}
                  component={renderField}
                  label='First name'
                  validate={required}
                />
                <div className='display-reg-inv'>
                  <Field
                    name='lastName'
                    {...lastName}
                    component={renderField}
                    label='Last name'
                    validate={required}
                  />
                </div>
                <div className='sex-div'>
                  <label>Male</label> <br />
                  {/* <input type='radio' name='sex' checked={male} onClick={() => this.setState({male: 'MALE', female: false})} /> */}
                  {male ? <a><img src={maleRedIcon} className='male-image' alt='logo-img' /></a>
                    : <a onClick={() => this.setState({male: 'MALE', female: false})}><img src={maleIcon} className='male-image' alt='logo-img' /></a>}
                </div>
                <div className='sex-div display-reg-inv'>
                  <label>Female</label> <br />
                  {/* <input type='radio' name='sex' checked={female} onClick={() => this.setState({male: false, female: 'FEMALE'})} /> */}
                  {female
                    ? <a><img src={femaleRedIcon} className='female-img' alt='logo-img' /></a>
                    : <a onClick={() => this.setState({male: false, female: 'FEMALE'})}><img src={femaleIcon} className='female-img' alt='logo-img' /></a>}
                </div>
                <Field
                  name='username'
                  {...username}
                  component={renderField}
                  label='Username'
                  validate={required}
                />
                <Field
                  name='email'
                  {...email}
                  component={renderField}
                  label='Email'
                  validate={required}
                />
                <Field
                  name='password'
                  {...password}
                  component={renderField}
                  label='Password'
                  validate={required}
                  type='password'
                />
              </div>
            </div>
            <div className='col-md-6 text-center input-parent-575 female-section-575'>
              <div className='display-reg'>
                <Field
                  name='lastName'
                  {...lastName}
                  component={renderField}
                  label='Last name'
                  validate={required}
                />
              </div>
              <div className='sex-div display-reg'>
                <label>Female</label> <br />
                {/* <input type='radio' name='sex' checked={female} onClick={() => this.setState({male: false, female: 'FEMALE'})} /> */}
                {female
                  ? <a><img src={femaleRedIcon} className='female-img' alt='logo-img' /></a>
                  : <a onClick={() => this.setState({male: false, female: 'FEMALE'})}><img src={femaleIcon} className='female-img' alt='logo-img' /></a>}
              </div>
              <div className='row'>
                <div className='col-md-3' />
                <div className='col-md-6'>
                  <Field
                    name='day'
                    {...day}
                    component={renderField}
                    label='Day of birth'
                    validate={required}
                  />
                  <Field
                    name='month'
                    {...month}
                    component={renderField}
                    label='Month of birth'
                    validate={required}
                  />
                  <Field
                    name='year'
                    {...year}
                    component={renderField}
                    label='Year of birth'
                    validate={required}
                  />
                  <div className='col-md-12'>
                    <button type='submit' className='red-btn'>Done</button>
                  </div>
                </div>
                <div className='col-md-3' />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const Registration = reduxForm({
  form: 'registration',
  fields: ['firstName', 'lastName', 'username', 'email', 'password', 'day', 'month', 'year']
})(RegistrationForm);

export default connect(null, actions)(Registration);
