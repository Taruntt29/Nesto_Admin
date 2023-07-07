import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useGetQuery, usePostMutation } from '../../../hooks/tanstackQuery';
import { apiEndpoints } from '../../../config/apiEndpoints';
import { regexValidation } from '../../../config/regex';
import InputField from '../../../components/form/InputField-2/InputField';
import { CustomButton } from '../../../components';
import CustomCreatableSelect from '../../../components/creatable-select/CustomCreatableSelect';
import PackageIncludeSection from './package-include/PackageIncludeSection';

const AddSubscriptions = () => {
  const [formValues, setFormValues] = useState({
    subscriptionName: 'Old is Gold New My',
    colorCode: 'Blue',
    price: 10,
    durationIndays: 10,
    propertyList: ['PRPTY-476735'],
    subLiner: 'Golden Subscription',
    bottomSubliner: 'Golden Subscription',
    isRecommended: true,
    paidVisit: {
      amountPervisit: 2500,
      noOfpaidVisit: 2500,
    },
    banner: {
      bannerDuration: '50 min',
    },
    flashScreen: {
      flashScreenduration: '50 min',
    },
  });

  const {
    mutate: addSubscriptions,
    isLoading: isAddSubscriptionsLoading,
    isError: isAddSubscriptionsIsError,
    data: addSubscriptionsData,
    isSuccess: isAddSubscriptionsSuccess,
    // refetch: getAllpropertyRefetch,
  } = usePostMutation(apiEndpoints.addSubscription, 'getAllSubscription');

  const {
    isLoading: isGetAllPropertyLoading,
    isError: isGetAllPropertyIsError,
    data: getAllPropertyData,
    isSuccess: isGetAllPropertySuccess,
    refetch: getAllPropertyRefetch,
  } = useGetQuery('getAllproperty', apiEndpoints.getAllproperty);

  const handleSetFormValues = (name, value) =>
    setFormValues(prevFormValues => ({
      ...prevFormValues,
      [name]: value,
    }));
  const handleSubmit = e => {
    e.preventDefault();
    console.log(formValues);
    if (!formValuesValidator(formValues)) {
      return false;
    }
    console.log(formValues);

    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(
        key,
        Array.isArray(value) ? JSON.stringify(value) : value
      );
    });

    addSubscriptions(formValues);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Container className="NESTO__admin__main__add__property__section NESTO__admin__main__add__property__form m-3 px-4 py-2 pb-5">
          <Row>
            <Col xs={12}>
              <Row className="gy-4">
                <Col xs={6}>
                  <InputField
                    id="subscriptionName"
                    label="Subscription Name"
                    type="text"
                    placeholder="Subscription Name"
                    name="subscriptionName"
                    value={formValues.subscriptionName}
                    handleSetFormValues={handleSetFormValues}
                    regexPattern={regexValidation.namePattern}
                    validFeedback="Looks good!"
                    invalidFeedback="Please enter a valid Name."
                    className="input-background"
                  />
                </Col>

                <Col xs={6}>
                  <InputField
                    id="colorCode"
                    label="Color Code"
                    type="text"
                    placeholder="Color Code"
                    name="colorCode"
                    value={formValues.colorCode}
                    handleSetFormValues={handleSetFormValues}
                    regexPattern={regexValidation.namePattern}
                    validFeedback="Looks good!"
                    invalidFeedback="Please enter a valid color code."
                    className="input-background"
                  />
                </Col>

                <Col xs={6}>
                  <InputField
                    id="price"
                    label="Price"
                    type="text"
                    placeholder="Enter price"
                    name="price"
                    value={formValues.price}
                    handleSetFormValues={handleSetFormValues}
                    regexPattern={regexValidation.subscriptionsPattern}
                    validFeedback="Looks good!"
                    invalidFeedback="Please enter a valid Price."
                    className="input-background"
                  />
                </Col>

                <Col xs={6}>
                  <InputField
                    id="durationIndays"
                    label="Duration in Days"
                    type="text"
                    placeholder="Enter duration in Days"
                    name="durationIndays"
                    value={formValues.durationIndays}
                    handleSetFormValues={handleSetFormValues}
                    regexPattern={regexValidation.numericPattern}
                    validFeedback="Looks good!"
                    invalidFeedback="Please enter a valid Value."
                    className="input-background"
                  />
                </Col>

                <Col xs={12}>
                  <CustomCreatableSelect
                    customCreatableSelectName="customCreatableSelectName"
                    label="Listed Properties"
                    placeholder="Add listed Properties"
                    type="property"
                    data={getAllPropertyData}
                    name="propertyList"
                    setPropertyFormData={setFormValues}
                  />
                </Col>

                <Col xs={6}>
                  <InputField
                    id="subLiner"
                    label="Sub Liner"
                    type="text"
                    placeholder="Sub Liner"
                    name="subLiner"
                    value={formValues.subLiner}
                    handleSetFormValues={handleSetFormValues}
                    regexPattern={regexValidation.namePattern}
                    validFeedback="Looks good!"
                    invalidFeedback="Please enter a valid Name."
                    className="input-background"
                  />
                </Col>

                <Col xs={6}>
                  <InputField
                    id="bottomSubliner"
                    label="Bottom Sub Liner"
                    type="text"
                    placeholder="Bottom Sub Liner"
                    name="bottomSubliner"
                    value={formValues.bottomSubliner}
                    handleSetFormValues={handleSetFormValues}
                    regexPattern={regexValidation.namePattern}
                    validFeedback="Looks good!"
                    invalidFeedback="Please enter a valid Name."
                    className="input-background"
                  />
                </Col>

                {/* package */}
                <PackageIncludeSection />
                {/* package code end */}

                <Col xs={6}></Col>

                <Col xs={12}>
                  {isAddSubscriptionsIsError && <ErrorMessage />}
                </Col>
                <Col xs={12} className="d-flex justify-content-end gap-3 mt-5">
                  <CustomButton
                    isDisabled={isAddSubscriptionsLoading}
                    customButtonClass="custom-button-primary rounded-2 px-5"
                  >
                    {isAddSubscriptionsLoading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      'Add'
                    )}
                  </CustomButton>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  );
};

export default AddSubscriptions;
