import React from 'react';

export const required = value => value ? undefined : 'This field is required';

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLenght = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const Lenght = data => value =>
  value && value.length !== data ? `Must be ${data} characters` : undefined;

export const hasNumber = value => value && !(/[^a-zA-Z]/.test(value)) ? 'Must contain at least one number or a symbol' : undefined;

export const hasCapitalLetter = value => value && !(/[A-Z]/.test(value)) ? 'Must contain capital letters' : undefined;

export const maxLength15 = maxLength(15);
export const maxLength4 = maxLength(4);
export const minLenght3 = minLenght(3);

export const Lenght5 = Lenght(5);

export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;

export const minValue18 = minValue(18);

export const email = value =>
  value && !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
    ? 'Invalid email address' : undefined;

export const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined;

export const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?' : undefined;

export const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <fieldset className='form-group'>
    <label>{label}: </label>
    <input {...input} placeholder={label} type={type} className='form-control form-control-success' />
    <div className='form-control-feedback'>{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</div>
  </fieldset>
);

// const required = value => (value == null ? 'Required' : undefined);
