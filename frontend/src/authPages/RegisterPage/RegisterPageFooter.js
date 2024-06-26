import RedirectInfo from '../../shared/components/RedirectInfo';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
  const nav = useNavigate();

  const handlePushToLoginPage = () => {
    nav('/login');
  };

  const getNotFormValid = () => {
    return 'Username must contain between 3 and 12 characters, password must contain between 6 to 12 characters and email must be correct as well';
  };

  const getFormValid = () => {
    return 'Press to register';
  };

  return (
    <>
      <Tooltip title={!isFormValid ? getNotFormValid() : getFormValid()}>
        <div>
          <CustomPrimaryButton
            label="Register"
            additionalStyle={{ marginTop: '30px' }}
            disabled={!isFormValid}
            onClick={handleRegister}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="Already have an account? "
        redirectText="Login here"
        additionalStyles={{ marginTop: '5px' }}
        redirectHandler={handlePushToLoginPage}
      />
    </>
  );
};
export default RegisterPageFooter;
