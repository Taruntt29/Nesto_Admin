import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./BuilderPop.css";
// import FileUpload from "../Fileupload/Fileupload";
import FileUpload from "../../../../components/file-upload/FileUpload";
import { Col, Form, Row } from "react-bootstrap";
import { apiEndpoints } from "../BuilderApi/BuilderApiEndpoint";
import Submit from "./Submit";
import { getAPI, postAPI, putAPI } from "../BuilderApi/BuilderApiRequest";
import REGEX from "../BuilderApi/ValidationRegex";

const NewBuilder = () => {
  const [showSubmit, setShowSubmit] = useState(false);
  const [name, setName] = useState("");
  const [panOfCompany, setPanOfCompany] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [gst, setGst] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [typeOfProperty, setTypeOfProperty] = useState("");
  const [locationOfProperty, setLocationOfProperty] = useState("");
  const [projectName, setProjectName] = useState("");
  const [builder, setBuilder] = useState({});

  const [desError, setDesError] = useState(false);

  const onResetHandler = () => {
    setName("");
    setPanOfCompany("");
    setPhoneNumber("");
    setCompanyName("");
    setGst("");
    setDescription("");
    setEmail("");
    setTypeOfProperty("");
    setLocationOfProperty("");
    setProjectName("");
  };

  const onSubmitHandler = async () => {
    const formData = {
      name,
      panOfCompany,
      phoneNumber,
      companyName,
      gst,
      description,
      email,
      // typeOfProperty,
      // locationOfProperty,
      // projectName,
      companyType: "examaple",
    };
    debugger;
    console.log(formData);

    // const phoneNumberRegex = /^\d{10}$/;
    if (!REGEX.numberPattern.test(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!REGEX.emailPattern.test(email)) {
      console.log("Invalid Email");
      return;
    }
    if (!REGEX.gstPattern.test(gst)) {
      console.log("Invalid GST");
      return;
    }
    setBuilder(formData);
    setShowSubmit(true);
  };

  return (
    <>
      <Submit
        show={showSubmit}
        // hideAddForm={props.onHide}
        builder={builder}
        onHide={setShowSubmit}
      />
      <h3>Add Builder</h3>
      <br />
      <br />
      <div className="d-flex justify-content-evenly">
        <span>
          <p>Upload your Profile Image</p>
          <FileUpload files={[]} />
        </span>
        <span>
          <p>Upload Your Business Logo</p> <FileUpload files={[]} />
        </span>
        <span>
          <p>Upload your document</p>
          <FileUpload files={[]} />
        </span>
      </div>
      <br />
      <br />
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              <h5> Builder Name*</h5>
            </Form.Label>
            <Form.Control
              className="builder-details_modal_input"
              type="text"
              placeholder="Enter builder name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />

            <Form.Label>
              <h5> Company PAN*</h5>
            </Form.Label>
            <Form.Control
              className="builder-details_modal_input"
              type="text"
              placeholder="Enter Company PAN"
              value={panOfCompany}
              onChange={(e) => {
                setPanOfCompany(e.target.value);
              }}
            />
            <br />
            {/* <Form.Label>
              <h5> Property*</h5>
            </Form.Label>
            <Form.Control
              className="builder-details_modal_input"
              type="text"
              placeholder="Enter Property Type"
              value={typeOfProperty}
              onChange={e => {
                setTypeOfProperty(e.target.value);
              }}
            // /> */}
            {/* <br /> */}

            {/* <Form.Label>
              <h5> Location state*</h5>
            </Form.Label>
            <Form.Control
              className="builder-details_modal_input"
              type="text"
              placeholder="Enter Your state"
              value={locationOfProperty}
              onChange={e => {
                setLocationOfProperty(e.target.value);
              }}
            /> */}
            {/* <br /> */}
            {/* <Form.Label>
              <h5>Project Name*</h5>
            </Form.Label>
            <Form.Control
              className="builder-details_modal_input"
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={e => {
                setProjectName(e.target.value);
              }}
            /> */}
            <Form.Label>
              <h5>Email*</h5>
            </Form.Label>
            <Form.Control
              className="builder-details_modal_input"
              isInvalid={!REGEX.emailPattern.test(email)}
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              // isInvalid={!/^\S+@\S+\.\S+$/.test(email)}
            />
            {/* <Form.Control.Feedback type="invalid">
              Please enter a valid Email.
            </Form.Control.Feedback> */}
            <br />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              <h5>Phone Number*</h5>
            </Form.Label>
            <Form.Control
              className="builder-details_modal_input"
              // isInvalid={REGEX.numberPattern.test(phoneNumber)}
              type="text"
              maxLength="10"
              placeholder="Enter phone number"
              value={phoneNumber}
              // onChange={(e) => {
              //   setPhoneNumber(e.target.value);
              // }}
              onChange={(e) => {
                const input = e.target.value;
                const phoneRegex = /^[0-9\b]+$/;
                if (phoneRegex.test(input.trim())) {
                  setPhoneNumber(input);
                } else if (input.length === 0) {
                  setPhoneNumber(input);
                } else {
                  console.log("Invlaid");
                }
              }}
            />
            {/* <Form.Control.Feedback type="invalid">
              Please enter a valid 10-digit phone number.
            </Form.Control.Feedback> */}
            <br />
            <Form.Label>
              <h5>Company Name*</h5>
            </Form.Label>
            <Form.Control
              className="builder-details_modal_input"
              type="text"
              placeholder="Enter company"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
            />
            <br />
            <Form.Label>
              <h5> Company GST* </h5>
            </Form.Label>
            <Form.Control
              className="builder-details_modal_input"
              type="text"
              placeholder="Enter company GST"
              value={gst}
              onChange={(e) => {
                setGst(e.target.value);
              }}
            />
            <br />
            <Form.Label>
              <h5>About the Builder*</h5>
            </Form.Label>
            <Form.Control
              className={`builder-details_modal_input`}
              type="text"
              isInvalid={desError}
              placeholder="Enter builder description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value.length < 5) {
                  setDesError(true);
                } else {
                  setDesError(false);
                }
              }}
            />
            {/* <Form.Control.Feedback type="invalid">
              Please enter description.
            </Form.Control.Feedback> */}
            <br />

            {/* <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback> */}
            <br />
          </Form.Group>
        </Col>
      </Row>

      <h6 style={{ color: "#F1323D" }}>
        "Fields Marked with an asterk(*) are required."
      </h6>
      <div className="builder-details_btn_div d-flex gap-2">
        <Button
          variant="transparent"
          type="button"
          className="builder-details_btn"
          onClick={onSubmitHandler}
        >
          Next
        </Button>
        <Button
          variant="transparent"
          type="button"
          className="builder-details_btn"
          onClick={onResetHandler}
        >
          Reset
        </Button>
      </div>
    </>
  );
};

export default NewBuilder;
