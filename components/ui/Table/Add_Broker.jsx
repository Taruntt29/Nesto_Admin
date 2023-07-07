import React from "react";
import Button from "react-bootstrap/Button";
import { IoIosAdd } from "react-icons/all";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import "./BrokerManagement.css";
import Image from "react-bootstrap/Image";
function Add_Broker() {
  return (
    <>
      <div className="bm_addbroker">
        <div className="d-flex">
          <h5 className="bm_addfont"> Add Broker</h5>
          <h5 className=" bm_closeform ms-auto" onClick={CloseForm}>
            <AiOutlineCloseCircle />
          </h5>
        </div>
        <div>
          <Image />
        </div>
        <Form className=" bm_addform mt-3 ">
          <div className=" d-flex gap-4">
            <Form.Group className="w-50">
              <Form.Label>Broker Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Broker Name"
                disabled
              />
            </Form.Group>
            <Form.Group className="w-50">
              <Form.Label>Broker ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Broker ID"
                disabled
              />
            </Form.Group>
          </div>
          <div className=" d-flex gap-4 mt-3">
            <Form.Group className="w-50">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Pone Number"
                disabled
              />
            </Form.Group>
            <Form.Group className="w-50">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Enter Email ID" disabled />
            </Form.Group>
          </div>
          <div className=" d-flex gap-4 mt-3">
            <Form.Group className="w-50">
              <Form.Label>RERA Registration Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter RERA Reg. Number"
                disabled
              />
            </Form.Group>
            <Form.Group className="w-50">
              <Form.Label>Adress</Form.Label>
              <Form.Control type="text" placeholder="En" disabled />
            </Form.Group>
          </div>

          <div className=" d-flex gap-4 mt-3">
            <Form.Group className="w-50">
              <Form.Label>Broker Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" disabled />
            </Form.Group>
          </div>

          <div className=" mt-4 d-flex gap-2">
            <Button className="bm_addbutton px-5 py-1.5">Add</Button>
            <Button className="bm_resetbutton px-5 py-1.5 ">Reset</Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Add_Broker;
