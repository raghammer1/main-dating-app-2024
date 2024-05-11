import React, { useState } from 'react';
import InputWithLabels from '../../../shared/components/InputWithLabels';
import DatePickerComponent from '../../../shared/components/DatePickerComponent';
import DotSelector from '../../../shared/components/DotSelector';

const AboutUser = () => {
  const [startDate, setStartDate] = useState(new Date());

  const genders = ['Male', 'Female', 'She-Male', 'He-Female', 'Other'];
  const [userGender, setUserGender] = useState(genders[0]);

  const [userInterestGender, setUserInterestGender] = useState(genders[0]);

  const relationshipTypes = ['Long Term', 'Short Term', 'lol'];
  const [relationshipIntent, setRelationshipIntent] = useState(
    relationshipTypes[0]
  );

  return (
    <div style={{ height: '100vh', width: '100vw', backgroundColor: '#222' }}>
      <div style={{ width: '40%', marginLeft: '30px', paddingTop: '20px' }}>
        <DatePickerComponent
          startDate={startDate}
          setStartDate={setStartDate}
        />
        <div>
          <h1 style={{ color: 'white' }}>Gender: {userGender}</h1>
          <DotSelector
            items={genders}
            selectedValue={userGender}
            setSelectedValue={setUserGender}
          />
        </div>
        <div>
          <h1 style={{ color: 'white' }}>
            Gender Interest: {userInterestGender}
          </h1>
          <DotSelector
            items={genders}
            selectedValue={userInterestGender}
            setSelectedValue={setUserInterestGender}
          />
        </div>
        <div>
          <h1 style={{ color: 'white' }}>
            Relationship Intent: {relationshipIntent}
          </h1>
          <DotSelector
            items={relationshipTypes}
            selectedValue={relationshipIntent}
            setSelectedValue={setRelationshipIntent}
          />
        </div>
      </div>
    </div>
  );
};
export default AboutUser;
