import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// import './BuilderPop.css'

const SubmitSubscription = (props) => {
  return (
    <>
      <Modal
        show={props.show}
        onHide={() => {
          props.onChange(false);
        }}
        size="lg"
        animation={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="builder-details_modal">
          <Modal.Title className="">
            <span className="builder-details_modal_heading">
              Are You sure you want to save the information?
            </span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className=" d-flex justify-content-center gap-2">
              <Button
                type="button"
                variant="transparent"
                className="builder-details_btn"
                onClick={() => {
                  props.onHide(false);
                }}
              >
                No
              </Button>
              <Button
                type="button"
                variant="transparent"
                className="builder-details_btn"
                onClick={() => {
                  props.onHide(false);
                }}
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SubmitSubscription;
