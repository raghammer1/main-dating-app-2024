import { useCallback, useEffect, useState } from 'react';
import AuthBox from '../../shared/components/AuthBox';
import LoginPageHeader from './LoginPageHeader';
import LoginPageInputs from './LoginPageInputs';
import LoginPageFooter from './LoginPageFooter';
import { validateLoginForm } from '../../shared/utils/validators';
import { useAlert } from '../../shared/components/AlertNotification';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import userStore from '../../zustand/userStore';

const LoginPage = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);
  const { setCurrentUser } = userStore();

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const nav = useNavigate();
  const { showAlert } = useAlert();
  const handleLoginFunction = useCallback(async () => {
    try {
      const response = await login({ mail, password });
      console.log(response, 'response');
      const token = response.data.token;
      localStorage.setItem('token', token);

      setCurrentUser({ name: '', email: mail });
      showAlert('Welcome back', 'green');

      nav('/dashboard');
    } catch (error) {
      if (error.response) {
        console.log('Error data:', error.response.data);
        const errorMessage =
          error.response.data.error || 'An unexpected error occurred';
        showAlert(errorMessage, 'tomato');
      } else if (error.request) {
        console.log('Error request:', error.request);
      } else {
        console.log('Error', error.message);
      }
    }
  }, [mail, password]);

  return (
    <AuthBox>
      <LoginPageHeader />
      <LoginPageInputs
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
      />
      <LoginPageFooter
        isFormValid={isFormValid}
        handleLoginFunction={handleLoginFunction}
      />
    </AuthBox>
  );
};

export default LoginPage;
