// DatePickerComponent.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent = ({ startDate, setStartDate }) => {
  const handleChange = (date) => {
    console.log(date);
    setStartDate(date);
    // onDateChange(date); // Propagate the date to the parent component if needed
  };

  return (
    <div style={{ color: '#fff', padding: '20px' }}>
      <h2>Select Your Birth Date</h2>
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        maxDate={new Date()}
        showYearDropdown
        dropdownMode="select"
      />
    </div>
  );
};

export default DatePickerComponent;
