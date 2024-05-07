import { Typography } from '@mui/material';
import InputWithLabels from '../../shared/components/InputWithLabels';
import { useState } from 'react';

const LoginPageInputs = ({ mail, setMail, password, setPassword }) => {
  return (
    <>
      <InputWithLabels
        value={mail}
        setValue={setMail}
        type="Email"
        placeholder="Enter email"
        label="Email"
      />
      <InputWithLabels
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="Enter password"
        label="password"
      />
    </>
  );
};
export default LoginPageInputs;
