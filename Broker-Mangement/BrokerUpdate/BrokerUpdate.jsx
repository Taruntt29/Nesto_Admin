import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import ToastContainer from "react-bootstrap/ToastContainer";
import ToastHeader from "react-bootstrap/ToastHeader";
import galleryAdd from "../../../../assets/images/dsa/gallery-add.svg";
import dots from "../../../../assets/images/dsa/dots.png";

function BrokerUpdate(params) {
  const [message, setMessage] = useState("");
  const [nameBroker, setNameBroker] = useState("");
  const [idBroker, setIdBroker] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [reraRegistrationNumber, setReraRegNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessageName, setErrorMessageName] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePhoneNumber, setErrorMessagePhoneNumber] = useState("");
  const [errorMessagePan, setErrorMessagePan] = useState("");
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);
  let selectedRowId = params.rowData._id;
  const [selectedImage, setSelectedImage] = useState([]);
  const [slectedFile, setSelectFile] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://ec2-54-166-52-219.compute-1.amazonaws.com/api/v1/broker/getBrokerById?id=" +
          `${selectedRowId}`
      )
      .then((res) => {
        setNameBroker(res.data.data[0].name);
        setIdBroker(res.data.data[0]._id);
        setPhoneNumber(res.data.data[0].phoneNumber);
        setEmail(res.data.data[0].email);
        setPanNumber(res.data.data[0].panNumber);
        setReraRegNumber(res.data.data[0].reraRegistrationNumber);
        setAddress(res.data.data[0].address);
        setSelectedImage(res.data.data[0].profilePicture);
        setSelectFile(res.data.data[0].documents);
      })
      .catch((err) => {
        console.log("Something wrong happened", err);
      });
  }, []);

  const NameV = () => {
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    if (!nameRegex.test(nameBroker)) {
      setErrorMessageName("Invalid name format*");
    } else {
      setErrorMessageName("");
    }
  };
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

  const updateForm = async () => {
    const formData = new FormData();
    formData.append("profilePicture", selectedImage);
    formData.append("id", idBroker);
    formData.append("email", email);
    formData.append("name", nameBroker);
    formData.append("phoneNumber", phoneNumber);
    formData.append("panNumber", panNumber);
    formData.append("reraRegistrationNumber", reraRegistrationNumber);
    formData.append("address", address);
    formData.append("documents", slectedFile);
    const response = await axios.put(
      "http://ec2-54-166-52-219.compute-1.amazonaws.com/api/v1/broker/updateBroker",
      formData
    );
    setMessage(response.data.message);
  };

  function submitData() {
    params.onCancel();
    toggleShowA();
  }

  return (
    <>
      <div className="d-flex p-4">
        <div className="col-8  ">
          <input
            type="file"
            name="profile"
            onChange={(e) => {
              setSelectedImage(e.target.files[0]);
            }}
          />
          <div className="ImgDtaProflm">
            {selectedImage.length > 0 && <img src={selectedImage} />}
          </div>
        </div>

        <div className="col-8  ">
          <input
            type="file"
            name="profile"
            onChange={(e) => {
              setSelectFile(e.target.files[0]);
            }}
          />
          <div className="ImgDtaProflm">
            {slectedFile.length > 0 && <img src={slectedFile} />}
          </div>
        </div>
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
          <Form.Group className="mb-3 w-50">
            <Form.Label className="bm_addform">Broker Name</Form.Label>
            <Form.Control
              placeholder="name"
              name="name"
              value={nameBroker}
              onChange={(e) => setNameBroker(e.target.value)}
              onBlur={NameV}
              className="  bm_input_bg "
            />
            <div className="bm_errorvalidation">
              {errorMessageName && <div>{errorMessageName}</div>}
            </div>
          </Form.Group>
          <Form.Group className="mb-3 w-50">
            <Form.Label className="bm_addform">Broker ID</Form.Label>
            <Form.Control
              placeholder="ID"
              name="id"
              value={idBroker}
              className="  bm_input_bg "
            />
          </Form.Group>
        </div>

        <div className="w- d-flex gap-4">
          <Form.Group className="mb-3 w-50">
            <Form.Label className="bm_addform">PhoneNumber</Form.Label>
            <Form.Control
              placeholder="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onBlur={PhoneNumberv}
              className="  bm_input_bg "
            />
            <div className="bm_errorvalidation">
              {errorMessagePhoneNumber && <div>{errorMessagePhoneNumber}</div>}
            </div>
          </Form.Group>
          <Form.Group className="mb-3 w-50">
            <Form.Label className="bm_addform">Email</Form.Label>
            <Form.Control
              placeholder="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              className="  bm_input_bg "
            />
            <div className="bm_errorvalidation">
              {errorMessageEmail && <div>{errorMessageEmail}</div>}
            </div>
          </Form.Group>
        </div>
        <div className="w-100 d-flex gap-4">
          <Form.Group className="mb-3 w-50">
            <Form.Label className="bm_addform">Pan Number</Form.Label>
            <Form.Control
              placeholder="panNumber"
              name="panNumber"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value)}
              onBlur={validatePan}
              required
              className="  bm_input_bg "
            />
            <div className="bm_errorvalidation">
              {errorMessagePan && <div>{errorMessagePan}</div>}
            </div>
          </Form.Group>
          <Form.Group className="mb-3 w-50">
            <Form.Label className="bm_addform">Rera Reg</Form.Label>
            <Form.Control
              placeholder="reraRegistrationNumber"
              name="reraRegistrationNumber"
              value={reraRegistrationNumber}
              onChange={(e) => setReraRegNumber(e.target.value)}
              className="  bm_input_bg "
            />
          </Form.Group>
        </div>
        <div className="w-100 d-flex gap-4">
          <Form.Group className="mb-3 w-50">
            <Form.Label className="bm_addform">Address</Form.Label>
            <Form.Control
              placeholder="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="  bm_input_bg "
            />
          </Form.Group>
        </div>
      </div>
      <div className=" mt-4 d-flex gap-2">
        <Button className="bm_addbutton px-5 py-1.5" onClick={updateForm}>
          Save
        </Button>
        <Button
          className="bm_resetbutton px-5 py-1.5 "
          onClick={params.onCancel}
        >
          Cancel
        </Button>
      </div>
    </>
  );
}

export default BrokerUpdate;
