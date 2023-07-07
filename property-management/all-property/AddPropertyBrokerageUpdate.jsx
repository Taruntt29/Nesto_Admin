import React, { useEffect, useRef, useState } from 'react';
import FormData from 'form-data';
import { Form, Row, Col, Container } from 'react-bootstrap';
import { CustomButton, ErrorMessage, InputField } from '../../../../components';
import { usePutMutation } from '../../../../hooks/tanstackQuery';
import { apiEndpoints } from '../../../../config/apiEndpoints';
import ConfirmationModal from '../../../../components/confirmation-modal/ConfirmationModal';
import MilestoneTermsAndConditions from './milestone-terms-and-conditions/MilestoneTermsAndConditions';

const AddPropertyBrokerage = ({ id, setAddPropertySteps }) => {
  const formRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const [propertyBrokerageFormData, setPropertyBrokerageFormData] = useState({
    id,
    brokerageType: 'percentage',
    brokerageValue: '',
    milestonesTermsConditions: [],
  });

  const { mutate, isLoading, isSuccess, isError, error, data } = usePutMutation(
    apiEndpoints.updateBrokerageDetails,
    'getAllpropertyByBuilderId'
  );

  const handleInputChange = e => {
    const { name, value } = e.target;

    setPropertyBrokerageFormData(prevPropertyBrokerageFormData => ({
      ...prevPropertyBrokerageFormData,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(propertyBrokerageFormData);

    // const formData = new FormData();

    // Object.entries(propertyBrokerageFormData).forEach(([key, value]) => {
    //   formData.append(
    //     key,
    //     Array.isArray(value) ? JSON.stringify(value) : value
    //   );
    // });

    console.log(JSON.stringify(propertyBrokerageFormData));
    // return;
    mutate(propertyBrokerageFormData);
  };

  const handleNext = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    // formRef.current.dispatchEvent(new Event('submit', { cancelable: true }));
    console.log('working');
    handleSubmit(new Event('submit', { cancelable: true }));
    setShowModal(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setAddPropertySteps(prevAddPropertySteps => ({
        ...prevAddPropertySteps,
        addNewProperty: false,
        addFloorPlan: false,
        addBrokerage: false,
        mainId: null,
      }));
    }
  }, [isSuccess]);

  if (isError) {
    console.log('error');
  }

  if (isSuccess) {
    console.log('success');
  }

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container className="NESTO__admin__main__add__property">
          <Row>
            <Col xs={12}>
              <Row className="gy-4">
                <Col xs={12}>
                  <h1 className="add-property-section-heading">
                    Brokerage Payment Plan
                  </h1>
                </Col>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Brokerage Value (%)</Form.Label>
                    <InputField
                      type="text"
                      placeholder="Enter Amount"
                      value={propertyBrokerageFormData.brokerageValue}
                      inputName="brokerageValue"
                      onChange={handleInputChange}
                      InputFieldClassName="input-background"
                    />
                  </Form.Group>
                </Col>

                {/* <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Terms</Form.Label>
                    <InputField
                      type="text"
                      placeholder="Enter Here"
                      value={propertyBrokerageFormData.brokerageTerms}
                      inputName="brokerageTerms"
                      onChange={handleInputChange}
                      InputFieldClassName="input-background"
                    />
                  </Form.Group>
                </Col> */}

                <MilestoneTermsAndConditions
                  milestonesTermsConditions={
                    propertyBrokerageFormData.milestonesTermsConditions
                  }
                  setPropertyBrokerageFormData={setPropertyBrokerageFormData}
                  handleInputChange={handleInputChange}
                  propertyBrokerageFormData={propertyBrokerageFormData}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      </Form>
      <Container>
        <Row>
          <Col xs={12} className="d-flex justify-content-end gap-3 mt-5">
            <CustomButton
              handleAdd={handleNext}
              customButtonClass="custom-button-primary rounded-2 px-5"
            >
              Next
            </CustomButton>
            {/* <CustomButton customButtonClass="custom-button-outline-primary rounded-2 px-5">
              Reset
            </CustomButton> */}
            <CustomButton
              handleAdd={() =>
                setAddPropertySteps(prevAddPropertySteps => ({
                  ...prevAddPropertySteps,
                  addNewProperty: true,
                  addFloorPlan: false,
                  addBrokerage: false,
                }))
              }
              customButtonClass="custom-button-secondary rounded-2 px-5"
            >
              Back
            </CustomButton>
          </Col>
        </Row>
      </Container>
      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleConfirm={handleConfirm}
      />
    </>
  );
};

export default AddPropertyBrokerage;
