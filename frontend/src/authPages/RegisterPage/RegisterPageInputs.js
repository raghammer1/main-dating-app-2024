import InputWithLabels from '../../shared/components/InputWithLabels';

const RegisterPageInputs = (props) => {
  const { mail, setMail, username, setUsername, password, setPassword } = props;
  return (
    <>
      <InputWithLabels
        value={mail}
        setValue={setMail}
        label="Email address"
        type="text"
        placeholder="Enter the email address"
      />
      <InputWithLabels
        value={username}
        setValue={setUsername}
        label="Full Name"
        type="text"
        placeholder="Enter the username"
      />
      <InputWithLabels
        value={password}
        setValue={setPassword}
        label="Enter Password"
        type="password"
        placeholder="Enter password"
      />
    </>
  );
};
export default RegisterPageInputs;
