import { useEffect, useState } from 'react';
import AuthBox from '../../shared/components/AuthBox';
import { Typography } from '@mui/material';
import RegisterPageInputs from './RegisterPageInputs';
import RegisterPageFooter from './RegisterPageFooter';
import { validateRegisterForm } from '../../shared/utils/validators';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import userStore from '../../zustand/userStore';
import { sendOtp } from '../../services/api';

const RegisterPage = ({ register }) => {
  const [mail, setMail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser } = userStore();

  const [isFormValid, setIsFormValid] = useState(true);

  const nav = useNavigate();

  useEffect(() => {
    setIsFormValid(validateRegisterForm({ mail, username, password }));
  }, [mail, password, username, setIsFormValid]);

  const handleRegister = () => {
    // sendOtp({ toEmail: mail, key: uuidv4() });
    console.log(mail, password);

    console.log('lo');
  };

  return (
    <AuthBox>
      <Typography variant="h5" sx={{ color: 'white' }}>
        Create an account
      </Typography>
      <RegisterPageInputs
        mail={mail}
        username={username}
        setUsername={setUsername}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
      />
      <RegisterPageFooter
        isFormValid={isFormValid}
        handleRegister={handleRegister}
      />
    </AuthBox>
  );
};

export default RegisterPage;
