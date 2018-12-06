import React, {Component} from 'react';
import DateTime from 'react-datetime';
import {DATE_PICKER_FORMAT} from '../../helper/constants';
import icondate from '../../images/icon-date.png';
import $ from 'jquery';

class DatePickerField extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dateFormat: DATE_PICKER_FORMAT,
      dateMode: 'days',
      selectedDate: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  focusInput (event) {
    console.log('Targeted field', $(event.target).prevUntil('input').children('input').last());
    // $(event.target).prevUntil('input').children('input').last().click(); This doesn't work on date picker
    $(event.target).prevUntil('input').children('input').last().focus();
  }

  handleChange (newDate) {
    let day = newDate.date();
    let month = newDate.month() + 1;
    let year = newDate.year();
    let date = {
      day: day,
      month: month,
      year: year
    };
    this.setState({selectedDate: date});
  }

  render () {
    const {dateFormat, dateMode} = this.props;
    return (
      <div>
        <DateTime onChange={this.handleChange} dateFormat={dateFormat} timeFormat={false} viewdateMode={dateMode} closeOnSelect isValidDate={this.valid} inputProps={{placeholder: 'Select Date of Birth'}} />
        <img src={icondate} className='icon-dateandtime pointer' onClick={this.focusInput} />
      </div>
    );
  }
}

export default DatePickerField;
