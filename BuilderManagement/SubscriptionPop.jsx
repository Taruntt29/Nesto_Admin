import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import { postAPI } from "./BuilderApi/BuilderApiRequest";
import { apiEndpoints } from "./BuilderApi/BuilderApiEndpoint";

const SubscriptionPop = (props) => {
  const [name, setName] = useState("");
  const [costPerMonth, setCostPerMonth] = useState("");
  const [numberOfproperty, setNumberOfproperty] = useState("");
  const [description, setDescription] = useState("");
  const [colour, setColour] = useState("");
  const [planValidityInDays, setPlanValidityInDays] = useState("");
  const [numberOfVisit, setNumberOfVisit] = useState("");
  const [minimumSpend, setMinimumSpend] = useState("");
  const [isRecommended, setIsRecommended] = useState(false);

  const onResetHandler = () => {
    setName("");
    setCostPerMonth("");
    setNumberOfproperty("");
    setDescription("");
    setColour("");
    setPlanValidityInDays("");
    setNumberOfVisit("");
    setMinimumSpend("");
    setIsRecommended(false);
  };

  const onSubmitHandler = async () => {
    props.onHide(true);
    // props.onSubmit(true);
    debugger;

    //Form validation here....

    //After validation......
    console.log(props);
    const formData = {
      id: props.id,
      name,
      costPerMonth,
      numberOfproperty,
      description,
      colour,
      planValidityInDays,
      numberOfVisit,
      minimumSpend,
      isRecommended,
    };
    // console.log(formData);
    const response = await postAPI(
      apiEndpoints.updateSubscription,
      formData
    );

    console.log(response);
    props.onChange(false);
  };

  return (
    <>
      <Modal
        {...props}
        onHide={() => {
          setName("");
          setCostPerMonth("");
          setNumberOfproperty("");
          setDescription("");
          setColour("");
          setPlanValidityInDays("");
          setNumberOfVisit("");
          setMinimumSpend("");
          setIsRecommended("");
          props.onChange(false);
        }}
        size="lg"
        animation={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="builder-details_modal">
          <Modal.Title className="">
            <span className="builder-details_modal_heading">
              Subscription Plan Edit
            </span>
          </Modal.Title>
        </Modal.Header>
        {/* <FileUpload /> */}
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  <h5> Subscription Name</h5>
                </Form.Label>
                <Form.Control
                  className="builder-details_modal_input"
                  type="text"
                  placeholder="Enter subscription name"
                  value={name}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setName(e.target.value);
                  }}
                />
                <br />
                <Form.Label>
                  <h5>Price</h5>
                </Form.Label>
                <Form.Control
                  className="builder-details_modal_input"
                  type="text"
                  placeholder="Enter price"
                  value={costPerMonth}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setCostPerMonth(e.target.value);
                  }}
                />
                <br />
                <Form.Label>
                  <h5>Listed Properties</h5>
                </Form.Label>
                <Form.Control
                  className="builder-details_modal_input"
                  type="text"
                  placeholder="Enter listed properties"
                  value={numberOfproperty}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setNumberOfproperty(e.target.value);
                  }}
                />
                <br />
                <Form.Label>
                  <h5>Sub Liner</h5>
                </Form.Label>
                <Form.Control
                  className="builder-details_modal_input"
                  type="text"
                  placeholder="Enter Sub liner"
                  value={description}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDescription(e.target.value);
                  }}
                />
                <br />
                <Col>
                  <div className="d-flex justify-content-between">
                    <h5>Recommended</h5>
                    <Form.Check
                      // onClick={isRecommended}
                      onChange={(e) => {
                        debugger;
                        console.log(e.target.checked);
                        setIsRecommended(e.target.checked);
                      }}
                    />
                  </div>
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  <h5>Color Code</h5>
                </Form.Label>
                <Form.Control
                  className="builder-details_modal_input"
                  type="text"
                  placeholder="Enter color code"
                  value={colour}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setColour(e.target.value);
                  }}
                />
                <br />
                <Form.Label>
                  <h5>Durations in Days</h5>
                </Form.Label>
                <Form.Control
                  className="builder-details_modal_input"
                  type="text"
                  placeholder="Enter duration in days"
                  value={planValidityInDays}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setPlanValidityInDays(e.target.value);
                  }}
                />
                <br />
                <Form.Label>
                  <h5>No. of Visits</h5>
                </Form.Label>
                <Form.Control
                  className="builder-details_modal_input"
                  type="text"
                  placeholder="Enter no. of visits"
                  value={numberOfVisit}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setNumberOfVisit(e.target.value);
                  }}
                />
                <br />
                <Form.Label>
                  <h5>Bottom Sub Liner</h5>
                </Form.Label>
                <Form.Control
                  className="builder-details_modal_input"
                  type="text"
                  placeholder="Enter bottom sub liner"
                  value={minimumSpend}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setMinimumSpend(e.target.value);
                  }}
                />

                <br />
              </Form.Group>
            </Col>
          </Row>
          {/* <p>Recommended Check</p>
        <span className="d-flex gap-2">
          <Form.Check type="radio" aria-label="radio 1" />
          <Form.Check type="radio" aria-label="radio 1" />
        </span>
        <br /> */}
          <br />

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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SubscriptionPop;

// {
//   "id": "641d464c3e2267db5b4e0747",
//   "name": "platinum plan",
//   "isRecommended": "true",
//   "colour": "#ADD8E6",
//   "numberOfVisit": 11,
//   "planValidityInDays": 5,
//   "description": "The perfect all-rounder",
//   "numberOfproperty": 5,
//   "costPerMonth": 199,
//   "minimumSpend": "Minimum Spend ₹1,188 over 12 months"
// }

// import React, { useState } from 'react';

// function MyForm() {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     message: ''
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleReset = () => {
//     setFormData({
//       firstName: '',
//       lastName: '',
//       email: '',
//       message: ''
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // submit form data here
//   };

//   return (
//     <form onSubmit={handleSubmit} onReset={handleReset}>
//       <label>
//         First Name:
//         <input
//           type="text"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleInputChange}
//         />
//       </label>
//       <label>
//         Last Name:
//         <input
//           type="text"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleInputChange}
//         />
//       </label>
//       <label>
//         Email:
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleInputChange}
//         />
//       </label>
//       <label>
//         Message:
//         <textarea
//           name="message"
//           value={formData.message}
//           onChange={handleInputChange}
//         />
//       </label>
//       <button type="submit">Submit</button>
//       <button type="reset">Reset</button>
//     </form>
//   );
// }

// export default MyForm;
