import React from 'react';

export const renderField = ({ input, label, placeholder, type, meta: { touched, error, warning } }) => (
  <fieldset className='fieldset-inline-flex col-md-12'>
    <label>{label}: </label>
    <input {...input} placeholder={placeholder} type={type} className={''} autoComplete={type === 'password' ? 'new-password' : 'off'} />
    {error && touched ? <div className='form-control-feedback'>{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</div> : ''}
  </fieldset>
);
