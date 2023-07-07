import { Button } from 'react-bootstrap';
import './CustomButton.css';

const CustomButton = ({
  children,
  customButtonClass,
  isDisabled,
  handleAdd,
}) => {
  return (
    <Button
      onClick={handleAdd}
      type="submit"
      disabled={isDisabled}
      className={`custom-button ${customButtonClass ? customButtonClass : ''}`}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
