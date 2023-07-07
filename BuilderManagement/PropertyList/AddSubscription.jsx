import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { apiEndpoints } from '../BuilderApi/BuilderApiEndpoint';
import { postAPI } from '../BuilderApi/BuilderApiRequest';
import Button from 'react-bootstrap/Button';
// import { setAriaPosInSet } from "ag-grid-community/dist/lib/utils/aria";

const AddSubscription = props => {
  const [name, setName] = useState('');
  const [planValidityInDays, setPlanValidityInDays] = useState('');
  const [numberOfVisit, setNumberOfVisit] = useState('');
  const [minimumSpend, setMinimumSpend] = useState('');
  const [costPerMonth, setCostPerMonth] = useState('');
  const [numberOfproperty, setNumberOfproperty] = useState('');
  const [description, setDescription] = useState('');
  // const [aboutBuilder, setAboutBuilder] = useState("");
  const onSubmitHandler = async () => {
    props.onHide(false);
    props.onSubmit(true);

    const formData = {
      name,
      planValidityInDays,
      numberOfVisit,
      minimumSpend,
      costPerMonth,
      numberOfproperty,
      description,
    };

    // debugger;
    const response = await postAPI(
      apiEndpoints.addSubscription,

      formData
    );
  };

  return (
    <>
      <h3>Add Subscription Plan</h3>
      <br />

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              <h5> Subscription Name</h5>
            </Form.Label>
            <Form.Control
              className="builder-details_modal_input"
              type="text"
              placeholder="Enter builder name"
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
            />
            <br />
            <Form.Label>
              <h5>Duration in Days</h5>
            </Form.Label>
            <Form.Control
              className="builder-details_modal_input"
              type="text"
              placeholder="Enter Location"
              value={planValidityInDays}
              onChange={e => {
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
              placeholder="Enter company type"
              value={numberOfVisit}
              onChange={e => {
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
              placeholder="Enter Company PAN*"
              value={minimumSpend}
              onChange={e => {
                setMinimumSpend(e.target.value);
              }}
            />
            <br />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              <h5>Price</h5>
            </Form.Label>
            <Form.Control
              className="builder-details_modal_input"
              type="text"
              placeholder="Enter phone number"
              value={costPerMonth}
              onChange={e => {
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
              placeholder="Enter company"
              value={numberOfproperty}
              onChange={e => {
                setNumberOfproperty(e.target.value);
              }}
            />
            <br />
            <Form.Label>
              <h5> Sub Liner </h5>
            </Form.Label>
            <Form.Control
              className="builder-details_modal_input"
              type="text"
              placeholder="Enter company GST"
              value={description}
              onChange={e => {
                setDescription(e.target.value);
              }}
            />
            <br />
            <Form.Label>
              <h5>Recommended Check</h5>
            </Form.Label>
            {/* <span className="d-flex gap-2">
              <Form.Check type="radio" aria-label="radio 1" />
              <Form.Check type="radio" aria-label="radio 1" />
            </span> */}
            <span>
              <Form>
                {['radio'].map(type => (
                  <div key={`reverse-${type}`} className="mb-3 d-flex">
                    <Form.Check
                      reverse
                      // label="1"
                      name="group1"
                      type={type}
                      id={`reverse-${type}-1`}
                    />
                    <Form.Check
                      reverse
                      // label="2"
                      name="group1"
                      type={type}
                      id={`reverse-${type}-2`}
                    />
                  </div>
                ))}
              </Form>
            </span>

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
          onClick={onSubmitHandler}
        >
          Reset
        </Button>
      </div>
      {/* </div> */}
    </>
  );
};

export default AddSubscription;
