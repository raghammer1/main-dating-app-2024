import React, { useState } from 'react';
import InputWithLabels from '../../../shared/components/InputWithLabels';
import DatePickerComponent from '../../../shared/components/DatePickerComponent';

const AboutUser = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div style={{ height: '100vh', width: '100vw', backgroundColor: '#222' }}>
      <div style={{ width: '40%', marginLeft: '30px', paddingTop: '20px' }}>
        {/* <InputWithLabels
          value={name}
          setValue={setName}
          type="text"
          placeholder="John Smith"
          label="Full Name"
        /> */}
        <DatePickerComponent
          startDate={startDate}
          setStartDate={setStartDate}
        />
      </div>
    </div>
  );
};
export default AboutUser;
