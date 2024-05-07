import Button from '@mui/material/Button';

const CustomPrimaryButton = ({ label, additionalStyle, disabled, onClick }) => {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: '#007aab',
        color: '#ffffff',
        textTransform: 'none',
        fontSize: '15px',
        fontWeight: 500,
        width: '100%',
        height: '40px',
      }}
      style={additionalStyle ? additionalStyle : {}}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
export default CustomPrimaryButton;
