import { Modal, Button } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessModal = ({ message, show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body className="text-center">
        <FaCheckCircle size={64} className="text-success mb-3" />
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleClose}>
          Success
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
