import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ConfirmationModal.css';
import CustomButton from '../ui/button/CustomButton';
const ConfirmationModal = ({ showModal, setShowModal, handleConfirm }) => {
  const handleClose = () => setShowModal(false);

  return (
    <Modal
      centered
      size="md"
      show={showModal}
      onHide={handleClose}
      className="confirmation-modal"
    >
      <Modal.Header className="border-0">
        <Modal.Title>
          Are you sure you want to save the information?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer className="d-flex border-0">
        <CustomButton
          handleAdd={handleClose}
          customButtonClass="flex-grow-1 py-3 custom-button-outline-primary"
        >
          No
        </CustomButton>
        <CustomButton
          handleAdd={handleConfirm}
          customButtonClass="flex-grow-1 py-3"
        >
          Yes
        </CustomButton>
        {/* <Button onClick={handleClose}>No</Button>
        <Button variant="primary" onClick={handleConfirm}>
          Yes
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
