import RedirectInfo from '../../shared/components/RedirectInfo';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const LoginPageFooter = ({ handleLoginFunction, isFormValid }) => {
  const nav = useNavigate();

  const handlePushToRegisterPage = () => {
    nav('/register');
  };

  const getNotFormValid = () => {
    return 'Enter correct email and password should contain between 6 and 12 characters';
  };

  const getFormValid = () => {
    return 'Press to log in';
  };

  return (
    <>
      <Tooltip title={!isFormValid ? getNotFormValid() : getFormValid()}>
        <div>
          <CustomPrimaryButton
            label="Log in"
            additionalStyle={{ marginTop: '30px' }}
            disabled={!isFormValid}
            onClick={handleLoginFunction}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="Need an account? "
        redirectText="Create an account"
        additionalStyles={{ marginTop: '5px' }}
        redirectHandler={handlePushToRegisterPage}
      />
    </>
  );
};
export default LoginPageFooter;
