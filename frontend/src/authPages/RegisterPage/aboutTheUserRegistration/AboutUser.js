import React, { useState } from 'react';
import InputWithLabels from '../../../shared/components/InputWithLabels';

const AboutUser = () => {
  const [name, setName] = useState('');

  return (
    <div style={{ height: '100vh', width: '100vw', backgroundColor: '#222' }}>
      <div style={{ width: '40%', marginLeft: '30px', paddingTop: '20px' }}>
        <InputWithLabels
          value={name}
          setValue={setName}
          type="text"
          placeholder="John Smith"
          label="Full Name"
        />
      </div>
    </div>
  );
};
export default AboutUser;
