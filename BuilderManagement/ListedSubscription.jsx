import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Table, Button, Col, Row, Card } from "react-bootstrap";
import { MdLocationPin } from "react-icons/md";
import propertyImage from "../../../assets/images/builder/propertyImage.png";

const ListedSubscription = (props) => {
  const arr = [1, 2, 3, 4, 5, 6];
  const propertyListing = arr.map((itm, index) => {
    return (
      <Col
        md={5}
        sm={24}
        key={index}
        className="card mb-5 shadow-sm rounded-4 col-md-3 p-0 border-0 w-100"
        style={{
          maxWidth: "18.5rem",
          background: "#EEEEEE",
        }}
      >
        <Card.Img className="w-100" variant="top" src={propertyImage} />
        <Card.Body>
          {/* <Card.Title></Card.Title> */}

          <div className="pb-2 d-flex justify-content-between">
            <p>Star Sun Hotels & Apartment</p>
            <button
              className="rounded"
              style={{ background: " rgba(39, 143, 217, 0.17)" }}
            >
              <p style={{ color: "#278FD9" }}>Rs500</p>
            </button>
          </div>
          <div className="d-flex">
            <MdLocationPin className="rounded-circle me-2" size={16} />
            <p>Gurgaon,Haryana</p>
          </div>
        </Card.Body>
      </Col>
    );
  });
  return (
    <>
      <Modal
        {...props}
        onHide={() => {
          props.onChange(false);
        }}
        size="xl"
        animation={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="builder-details_modal">
          <Modal.Title className="">
            <span className="builder-details_modal_heading">
              Listed Properties
            </span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className=" row justify-content-evenly ms-0">
            {propertyListing}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ListedSubscription;
