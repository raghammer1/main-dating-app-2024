import { useCallback, useEffect, useState } from 'react';
import AuthBox from '../../shared/components/AuthBox';
import LoginPageHeader from './LoginPageHeader';
import LoginPageInputs from './LoginPageInputs';
import LoginPageFooter from './LoginPageFooter';
import { validateLoginForm } from '../../shared/utils/validators';
import { useAlert } from '../../shared/components/AlertNotification';
import { useNavigate } from 'react-router-dom';
import {
  findProfiles,
  getPendingFriendInvitesAPI,
  login,
} from '../../services/api';
import useUserStore from '../../zustand/useUserStore';
import { useLoading } from '../../shared/components/useLoading';
import useCurrentDisplayProfiles from '../../zustand/useCurrentDisplayProfiles';
import { setTokenWithExpiry } from '../../tokenManagement/tokenManager';

const LoginPage = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);
  const { setCurrentUser } = useUserStore();
  const { setProfiles } = useCurrentDisplayProfiles();

  const { show, hide } = useLoading();

  const { getCurrentUser } = useUserStore();
  const addFriendInvitations = useUserStore(
    (state) => state.addFriendInvitations
  );

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const nav = useNavigate();
  const { showAlert } = useAlert();
  const handleLoginFunction = useCallback(async () => {
    try {
      show();
      const response = await login({ mail, password });
      console.log(response, 'response');
      // console.log('token', response);
      const token = response.data.token;
      // localStorage.setItem('token', token);
      setTokenWithExpiry(token, 60);

      setCurrentUser(response.data);

      localStorage.setItem('userId', response.data._id);

      showAlert('Welcome back', 'green');

      const profiles = await findProfiles({ id: response.data._id });
      setProfiles(profiles.data.profiles);
      console.log('ALL PROFILES', profiles, 'ALL PROFILES');

      const user = await getCurrentUser();
      console.log(user);

      const userId = localStorage.getItem('userId');

      const invites = await getPendingFriendInvitesAPI({ id: userId });
      console.log('THESE ARE THE INITIAL', invites);
      addFriendInvitations(invites.data);

      hide();

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
