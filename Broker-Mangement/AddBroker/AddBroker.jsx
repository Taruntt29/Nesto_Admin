import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import ".././BrokerManagement.css";
import Toast from "react-bootstrap/Toast";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ToastContainer from "react-bootstrap/ToastContainer";
import ToastHeader from "react-bootstrap/ToastHeader";
import FileUploader from "../../../../components/file-uploader/FileUploader";

function AddBroker(props) {
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneN] = useState("");
  const [panNumber, setPanN] = useState("");
  const [profilePicture, setProfilePictureFiles] = useState([]);
  const [document, setDocumentFiles] = useState([]);
  const [reraRegistrationNumber, setReraRegistrationNumber] = useState("");
  const [address, setAddress] = useState("");

  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePhoneNumber, setErrorMessagePhoneNumber] = useState("");
  const [errorMessagePan, setErrorMessagePan] = useState("");
  const [errorMessageName, setErrorMessageName] = useState("");

  console.log("profilePicture..............", profilePicture);
  function ResetForm() {
    setName("");
    setEmail("");
    setPhoneN("");
    setPanN("");
    setReraRegistrationNumber("");
    setAddress("");
    setErrorMessageEmail("");
    setErrorMessagePhoneNumber("");
    setErrorMessageName("");
    setErrorMessagePan("");
  }

  const validatePan = () => {
    const panRegex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if (!panRegex.test(panNumber)) {
      setErrorMessagePan("Invalid PAN number*");
    } else {
      setErrorMessagePan("");
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessageEmail("Invalid email address*");
    } else {
      setErrorMessageEmail("");
    }
  };

  const PhoneNumberv = () => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setErrorMessagePhoneNumber("Invalid phone number*");
    } else {
      setErrorMessagePhoneNumber("");
    }
  };

  const NameV = () => {
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    if (!nameRegex.test(name)) {
      setErrorMessageName("Invalid name format*");
    } else {
      setErrorMessageName("");
    }
  };

  const handleButtonClick = () => {
    props.setShow(!props.show);
  };

  const formData = new FormData();
  for (let i = 0; i < profilePicture.length; i++) {
    formData.append("profilePicture", profilePicture[i]);
  }

  for (let i = 0; i < document.length; i++) {
    formData.append("documents", document[i]);
  }
  formData.append("email", email);
  formData.append("name", name);
  formData.append("phoneNumber", phoneNumber);
  formData.append("panNumber", panNumber);
  formData.append("reraRegistrationNumber", reraRegistrationNumber);
  formData.append("address", address);
  const submitForm = async () => {
    try {
      const response = await axios.post(
        "http://ec2-54-166-52-219.compute-1.amazonaws.com/api/v1/broker/addBroker",
        formData
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error);
    }
  };

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleBrokerName(e) {
    setName(e.target.value);
  }

  function handlePhoneN(e) {
    setPhoneN(e.target.value);
  }
  function handlePanN(e) {
    setPanN(e.target.value);
  }
  function handleReraReg(e) {
    setReraRegistrationNumber(e.target.value);
  }
  function handleAddress(e) {
    setAddress(e.target.value);
  }

  function submitData() {
    handleButtonClick();
    toggleShowA();
  }
  return (
    <>
      <div className="d-flex p-4">
        <Col xs={12}>
          <Row className="mt-4">
            <Col xs={6}>
              <h1 className="file-upload-title">Upload Profile Image</h1>
              <FileUploader
                files={profilePicture}
                setFiles={setProfilePictureFiles}
              />
            </Col>
            <Col xs={6}>
              <h1 className="file-upload-title">Upload your documents</h1>

              <FileUploader files={document} setFiles={setDocumentFiles} />
            </Col>
          </Row>
        </Col>
      </div>
      <div className="">
        {message !== "" ? (
          <Row>
            <Col md={6} className="mb-2">
              <ToastContainer position="middle-center">
                <Toast delay="2000" show={showA} onClose={submitData}>
                  <ToastHeader closeButton="true" position="middle-center">
                    <strong className="me-auto">Broker</strong>
                  </ToastHeader>
                  <Toast.Body>{message}</Toast.Body>
                </Toast>
              </ToastContainer>
            </Col>
          </Row>
        ) : (
          ""
        )}
      </div>
      <div className="p-4">
        <div className="d-flex gap-4">
          <Form.Group className="mb-3 w-50 ">
            <Form.Label className="bm_addform">Broker Name</Form.Label>
            <Form.Control
              placeholder="name"
              name="name"
              value={name}
              onChange={handleBrokerName}
              className="  bm_input_bg "
              onBlur={NameV}
            />
            <div className="bm_errorvalidation">
              {errorMessageName && <div>{errorMessageName}</div>}
            </div>
          </Form.Group>

          <Form.Group className="mb-3 w-50">
            <Form.Label className="bm_addform">PhoneNumber</Form.Label>
            <Form.Control
              placeholder="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneN}
              className="  bm_input_bg "
              required
              onBlur={PhoneNumberv}
            />
            <div className="bm_errorvalidation">
              {errorMessagePhoneNumber && <div>{errorMessagePhoneNumber}</div>}
            </div>
          </Form.Group>
        </div>

        <div className="w- d-flex gap-4">
          <Form.Group className="mb-3 w-50">
            <Form.Label className="bm_addform">Email</Form.Label>
            <Form.Control
              placeholder="email"
              name="email"
              value={email}
              onChange={handleEmail}
              className="  bm_input_bg "
              required
              onBlur={validateEmail}
            />
            <div className="bm_errorvalidation">
              {errorMessageEmail && <div>{errorMessageEmail}</div>}
            </div>
          </Form.Group>

          <Form.Group className="mb-3 w-50">
            <Form.Label className="bm_addform">Pan Number</Form.Label>
            <Form.Control
              placeholder="panNumber"
              name="panNumber"
              value={panNumber}
              onChange={handlePanN}
              className="  bm_input_bg "
              onBlur={validatePan}
              required
            />
            <div className="bm_errorvalidation">
              {errorMessagePan && <div>{errorMessagePan}</div>}
            </div>
          </Form.Group>
        </div>
        <div className="w-100 d-flex gap-4">
          <Form.Group className="mb-3 w-50">
            <Form.Label className="bm_addform">
              RERA Registrtion Number
            </Form.Label>
            <Form.Control
              placeholder="reraRegistrationNumber"
              name="reraRegistrationNumber"
              value={reraRegistrationNumber}
              onChange={handleReraReg}
              className="  bm_input_bg "
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 w-50">
            <Form.Label className="bm_addform">Address</Form.Label>
            <Form.Control
              placeholder="address"
              name="address"
              value={address}
              onChange={handleAddress}
              className="  bm_input_bg "
              required
            />
          </Form.Group>
        </div>
      </div>

      <div className=" mt-4 d-flex gap-2">
        <Button className="bm_addbutton px-5 py-1.5" onClick={submitForm}>
          Add
        </Button>
        <Button className="bm_resetbutton px-5 py-1.5 " onClick={ResetForm}>
          Reset
        </Button>
      </div>
    </>
  );
}

export default AddBroker;
