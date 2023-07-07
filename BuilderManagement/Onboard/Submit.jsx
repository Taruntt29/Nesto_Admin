import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./BuilderPop.css";
import { postAPI } from "../BuilderApi/BuilderApiRequest";
import { apiEndpoints } from "../BuilderApi/BuilderApiEndpoint";

const BuilderPop = (props) => {
  const onYesHandler = async () => {
    // const response = await postAPI(
    //   apiEndpoints.addBuilder,

    //   props.builder
    // );
    try {
      const response = await postAPI(apiEndpoints.addBuilder, props.builder);
      debugger;
      console.log(response);
      if (response.message === "this phone number is already exist.") {
        console.warn("Number Exist");
        return;
      }

      if (response.message === "Successfully added new builder") {
        console.log("Added builder");
        props.onHide(false);
      }
    } catch (error) {
      console.log(error);
    }

    //API response validtion
    // onNoHandler();
  };
  const onNoHandler = () => {
    props.onHide(false);
    // props.hideAddForm(false);
  };
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
                onClick={onNoHandler}
              >
                No
              </Button>
              <Button
                type="button"
                variant="transparent"
                className="builder-details_btn"
                onClick={onYesHandler}
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

export default BuilderPop;
