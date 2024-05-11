import { useEffect, useState } from 'react';
import AuthBox from '../../shared/components/AuthBox';
import { Tooltip, Typography } from '@mui/material';
import RegisterPageInputs from './RegisterPageInputs';
import RegisterPageFooter from './RegisterPageFooter';
import {
  validateOtp,
  validateRegisterForm,
} from '../../shared/utils/validators';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import userStore from '../../zustand/userStore';
import { sendOtp, verifyOtp } from '../../services/api';
import { useAlert } from '../../shared/components/AlertNotification';
import CustomModal from '../../shared/components/CustomModal';
import InputWithLabels from '../../shared/components/InputWithLabels';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#555',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const RegisterPage = () => {
  const [mail, setMail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser } = userStore();
  const { showAlert } = useAlert();

  const [isFormValid, setIsFormValid] = useState(true);
  const [isOtpValid, setIsOtpValid] = useState(true);

  const [otp, setOtp] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const nav = useNavigate();

  useEffect(() => {
    setIsFormValid(validateRegisterForm({ mail, username, password }));
  }, [mail, password, username, setIsFormValid]);

  useEffect(() => {
    setIsOtpValid(validateOtp({ otp }));
  }, [otp]);

  const handleRegister = async () => {
    const response = await sendOtp({ toEmail: mail });
    showAlert(response.data, 'green');

    handleOpen();

    console.log(mail, password);

    console.log('lo');
  };

  const handleVerifyOtp = async () => {
    const response = await verifyOtp({ toEmail: mail, otp });
    console.log(response.data);
    nav(`/userInfo/${username}`);
  };

  // Messages for tooltip based on form validity.
  const getNotFormValid = () => {
    return 'Need a 6 digit OTP';
  };

  const getFormValid = () => {
    return 'Verify OTP';
  };

  return (
    <>
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
      <CustomModal
        open={open}
        handleCloseCreateTextBox={handleClose}
        style={style}
      >
        <Typography style={{ fontSize: '24px', color: '#fff' }}>
          Create Presentation
        </Typography>
        <InputWithLabels
          value={otp}
          setValue={setOtp}
          type="Presentation Name"
          placeholder="Enter Presentation Name"
          dataTestId={'create-presentation-name-test'}
          label="Presentation Name"
        />
        <>
          <Tooltip title={!isOtpValid ? getFormValid() : getNotFormValid()}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <CustomPrimaryButton
                label="Create"
                additionalStyle={{ marginTop: '20px' }}
                disabled={isOtpValid}
                onClick={handleVerifyOtp}
                dataTestid={'create-presentation-name-test-button'}
              />
              <CustomPrimaryButton
                label="Cancel"
                additionalStyle={{
                  marginTop: '20px',
                  backgroundColor: '#8B0000',
                }}
                onClick={handleClose}
                dataTestid={'cancel-presentation-button'}
              />
            </div>
          </Tooltip>
        </>
      </CustomModal>
    </>
  );
};

export default RegisterPage;
