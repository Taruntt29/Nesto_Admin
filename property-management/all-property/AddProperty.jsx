import React, { useEffect, useState } from 'react';
import FormData from 'form-data';
import { Form, Row, Col, Container } from 'react-bootstrap';
import {
  CustomButton,
  ErrorMessage,
  LoadingSpinner,
} from '../../../../components';
import FileUpload from '../../../../components/file-upload/FileUpload';
import CustomCreatableSelect from '../../../../components/creatable-select/CustomCreatableSelect';
import PaymentMilestone from './payement-milestone-table/PaymentMilestone';
import { useGetQuery, usePostMutation } from '../../../../hooks/tanstackQuery';
import { apiEndpoints } from '../../../../config/apiEndpoints';
import QuillEditor from '../../../../components/quill-editor/QuillEditor';
// import PropertyTypeSelect from '../../../../components/creatable-select/creatable-select-modal/CustomCreatableSelectModal';
import CurrentlyComparingPrice from './price/CurrentlyComparingPrice';
import FileUploader from '../../../../components/file-uploader/FileUploader';
import CreatableSelectWithModal from './property-type/CreatableSelectWithModal/CreatableSelectWithModal';
import { formValuesValidator } from '../../../../helper/helperFunction';
import { regexValidation } from '../../../../config/regex';
import InputField from '../../../../components/form/InputField-2/InputField';
import CustomFileUpload from '../../../../components/custom-file-upload/CustomFileUpload';
import AutoSuggest from '../../../../components/auto-suggest/AutoSuggest';

const AddProperty = ({ setAddPropertySteps }) => {
  const [files, setFiles] = useState([]);
  const [brochure, setBrochureFiles] = useState([]);
  const [propertyLogo, setPropertyLogo] = useState([]);
  const [propertyFormData, setPropertyFormData] = useState({
    isRera: false,
    builderId: '',
    name: '',
    location: '',
    constructionStatus: '',
    propertyType: '',
    propertySubTypes: [],
    latitude: '',
    longitude: '',
    amenitiesId: [],
    locationAdvantagesId: [],
    loanApprovedByIds: [],
    // nearByAreaId: [],
    // ageOfProperty: '',
    possessionDate: '',
    propertyDescription: ``,
    subCompany: '',
    propertyLiner: '',
    builderDiscount: '',
    termAndCondition:
      'Purchase price: The purchase price of the property and the terms of payment should be clearly stated in the contract. This includes the deposit amount, the balance of the purchase price, and the due date for payment.',
    projectSpecification: ``,
    paymentPlan: [],
    currentlyComparing: [],
  });
  const [formValidationError, setFormValidationError] = useState('');

  // const [propertyTypeValue, setPropertyTypeValue] = useState('');
  const [builder, setBuilder] = useState('');
  const [subCompany, setSubCompany] = useState('');

  const {
    mutate: addPropertyDetails,
    isLoading: isAddPropertyDetailsLoading,
    isError: isAddPropertyDetailsIsError,
    data: addPropertyDetailsData,
    isSuccess: isAddPropertyDetailsSuccess,
    refetch: getAllpropertyRefetch,
  } = usePostMutation(apiEndpoints.addPropertyDetails, 'getAllproperty');

  const {
    isLoading: isGetAllBuilderLoading,
    isError: isGetAllBuilderIsError,
    data: getAllBuilderData,
    isSuccess: isGetAllBuilderSuccess,
    refetch: getAllBuilderRefetch,
  } = useGetQuery('getAllBuilder', apiEndpoints.getAllBuilder);

  const {
    isLoading: isGetAllBankLoading,
    isError: isGetAllBankIsError,
    data: getAllBankData,
    isSuccess: isGetAllBankSuccess,
    refetch: getAllBankRefetch,
  } = useGetQuery('getAllBank', apiEndpoints.getAllBank);

  const {
    isLoading: isGetAllPropertyCategoryLoading,
    isError: isGetAllPropertyCategoryIsError,
    data: getAllPropertyCategoryData,
    isSuccess: isGetAllPropertyCategorySuccess,
    refetch: getAllPropertyCategoryRefetch,
  } = useGetQuery(
    'getAllPropertyCategory',
    apiEndpoints.getAllPropertyCategory
  );

  const {
    isLoading: isGetAllLocationAdvantageLoading,
    isError: isGetAllLocationAdvantageIsError,
    data: getAllLocationAdvantageData,
    isSuccess: isGetAllLocationAdvantagesIdSuccess,
    refetch: getAllLocationAdvantageRefetch,
  } = useGetQuery(
    'getAllLocationAdvantage',
    apiEndpoints.getAllLocationAdvantage
  );

  const {
    isLoading: isGetAllNearByAreaLoading,
    isError: isGetAllNearByAreaIsError,
    data: getAllNearByAreaData,
    isSuccess: isGetAllNearByAreaSuccess,
    refetch: getAllNearByAreaRefetch,
  } = useGetQuery('getAllNearByArea', apiEndpoints.getAllNearByArea);

  const {
    isLoading: isGetAllAmenitiesLoading,
    isError: isGetAllAmenitiesIsError,
    data: getAllAmenitiesData,
    isSuccess: isGetAllAmenitiesSuccess,
    refetch: getAllAmenitiesRefetch,
  } = useGetQuery('getAllAmenities', apiEndpoints.getAllAmenities);

  const {
    isLoading: isGetAllSubCompaniesLoading,
    isError: isGetAllSubCompaniesIsError,
    data: getAllSubCompaniesData,
    isSuccess: isGetAllSubCompaniesSuccess,
    refetch: getAllSubCompaniesRefetch,
  } = useGetQuery('getAllSubCompanies', apiEndpoints.getAllSubCompanies);

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (value === 'Ready To Move') {
      setPropertyFormData(prevPropertyFormData => ({
        ...prevPropertyFormData,
        possessionDate: '',
      }));
    }
    if (name === 'builderId') {
      const { id, companyName } = e.target.selectedOptions[0].dataset;
      console.log(id);
      setBuilder(value);
      setPropertyFormData(prevPropertyFormData => ({
        ...prevPropertyFormData,
        [name]: id,
      }));
    } else if (name === 'subCompany') {
      const { id } = e.target.selectedOptions[0].dataset;

      setSubCompany(value);
      setPropertyFormData(prevPropertyFormData => ({
        ...prevPropertyFormData,
        [name]: id,
      }));
    } else if (name === 'propertyType') {
      const selectedOption = e.target.selectedOptions[0];
      const dataId = selectedOption.dataset.id;
      setPropertyTypeValue(value);
      setPropertyFormData(prevPropertyFormData => ({
        ...prevPropertyFormData,
        [name]: dataId,
      }));
    } else {
      setPropertyFormData(prevPropertyFormData => ({
        ...prevPropertyFormData,
        [name]: value,
      }));
    }
  };

  const handleSetFormValues = (name, value) =>
    setPropertyFormData(prevFormValues => ({
      ...prevFormValues,
      [name]: value,
    }));

  const handleSubmit = e => {
    e.preventDefault();
    const {
      isRera,
      constructionStatus,
      possessionDate,
      ...restPropertyFormData
    } = propertyFormData;

    if (constructionStatus !== 'Ready To Move' && possessionDate === '') {
      setFormValidationError('Please complete all fields and select an image.');
      return;
    }

    if (
      constructionStatus === 'Ready To Move' &&
      !formValuesValidator({
        ...restPropertyFormData,
        constructionStatus,
        files,
        brochure,
        propertyLogo,
      })
    ) {
      setFormValidationError('Please complete all fields and select an image.');
      return false;
    }

    if (
      constructionStatus !== 'Ready To Move' &&
      !formValuesValidator({
        ...restPropertyFormData,
        constructionStatus,
        possessionDate,
        files,
        brochure,
        propertyLogo,
      })
    ) {
      setFormValidationError('Please complete all fields and select an image.');
      return false;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    for (let i = 0; i < brochure.length; i++) {
      formData.append('brochure', brochure[i]);
    }
    for (let i = 0; i < propertyLogo.length; i++) {
      formData.append('propertyLogo', propertyLogo[i]);
    }
    // formData.append('brochure', brochure);

    Object.entries(propertyFormData).forEach(([key, value]) => {
      formData.append(
        key,
        Array.isArray(value) ? JSON.stringify(value) : value
      );
    });
    console.log(propertyFormData);
    console.log(Array.from(formData));
    // return;
    addPropertyDetails(formData);
    // setFormValidationError('');
  };

  const handleAddPropertyRefetch = () => {
    getAllAmenitiesRefetch();
    getAllBuilderRefetch();
    getAllLocationAdvantageRefetch();
    getAllBankRefetch();
    getAllNearByAreaRefetch();
    addPropertyDetails(FormData);
  };

  useEffect(() => {
    if (isAddPropertyDetailsSuccess && addPropertyDetailsData) {
      setAddPropertySteps(prevAddPropertySteps => ({
        ...prevAddPropertySteps,
        addNewProperty: true,
        mainId: addPropertyDetailsData?._id ?? null,
      }));
    }
  }, [isAddPropertyDetailsSuccess, addPropertyDetailsData]);

  if (
    isGetAllBuilderLoading &&
    isGetAllBankLoading &&
    isGetAllLocationAdvantageLoading &&
    isGetAllPropertyCategoryLoading &&
    isGetAllNearByAreaLoading &&
    isGetAllAmenitiesLoading &&
    isGetAllSubCompaniesLoading
  ) {
    return <LoadingSpinner />;
  }

  if (
    isGetAllBuilderIsError &&
    isGetAllBankIsError &&
    isGetAllLocationAdvantageIsError &&
    isGetAllPropertyCategoryIsError &&
    isGetAllNearByAreaIsError &&
    isGetAllAmenitiesIsError &&
    isGetAllSubCompaniesIsError
  ) {
    return <ErrorMessage />;
  }

  if (
    isGetAllBuilderSuccess &&
    isGetAllBankSuccess &&
    isGetAllPropertyCategorySuccess &&
    isGetAllLocationAdvantagesIdSuccess &&
    isGetAllNearByAreaSuccess &&
    isGetAllAmenitiesSuccess &&
    isGetAllSubCompaniesSuccess
  ) {
    return (
      <>
        <Form onSubmit={handleSubmit}>
          <Container className="NESTO__admin__main__add__property">
            <Row>
              <Col xs={12}>
                <Row className="gy-4">
                  <Col xs={12}>
                    <Row>
                      <Col xs={4}>
                        <div className="grid-container grid-container-images">
                          <div>
                            <h1 className="file-upload-title">
                              Upload Property Photos
                            </h1>
                            <CustomFileUpload
                              placeholder="Upload Photo"
                              multiple={true}
                              selectedFiles={files}
                              setSelectedFiles={setFiles}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div className="grid-container">
                          <div>
                            <h1 className="file-upload-title">
                              Upload Property Logo
                            </h1>
                            <CustomFileUpload
                              placeholder="Upload Photo"
                              multiple={false}
                              selectedFiles={propertyLogo}
                              setSelectedFiles={setPropertyLogo}
                            />
                          </div>
                        </div>
                      </Col>

                      <Col xs={4}>
                        <h1 className="file__uploader__title">
                          Upload Brochure{' '}
                        </h1>
                        <CustomFileUpload
                          placeholder="Upload File"
                          multiple={true}
                          selectedFiles={brochure}
                          setSelectedFiles={setBrochureFiles}
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={12}>
                    <hr className="custom-divider" />
                  </Col>

                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Is Rera</Form.Label>
                      <div>
                        <Form.Check
                          inline
                          type="radio"
                          label="False"
                          name="isRera"
                          value={false}
                          checked={!propertyFormData.isRera}
                          onChange={e =>
                            setPropertyFormData({
                              ...propertyFormData,
                              isRera: false,
                            })
                          }
                        />
                        <Form.Check
                          inline
                          type="radio"
                          label="True"
                          name="isRera"
                          value={true}
                          checked={propertyFormData.isRera}
                          onChange={e =>
                            setPropertyFormData({
                              ...propertyFormData,
                              isRera: true,
                            })
                          }
                        />
                      </div>
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group>
                      <Form.Label>Select Builder</Form.Label>
                      <Form.Control
                        size="lg"
                        as="select"
                        placeholder="Select Builder"
                        value={builder}
                        onChange={handleInputChange}
                        className="input-background"
                        name="builderId"
                      >
                        <option value="">Select Builder</option>
                        {getAllBuilderData.length > 0 &&
                          getAllBuilderData?.map(builder => {
                            if (builder.name) {
                              return (
                                <option
                                  key={builder?._id}
                                  value={builder.name}
                                  data-id={builder?._id}
                                  data-company-name={builder?.companyName}
                                >
                                  {builder.companyName}
                                </option>
                              );
                            }
                          })}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <InputField
                      id="builderDiscount"
                      label="Builder Discount"
                      type="text"
                      placeholder="Builder Discount"
                      name="builderDiscount"
                      value={propertyFormData.builderDiscount}
                      handleSetFormValues={handleSetFormValues}
                      regexPattern={regexValidation.discountPattern}
                      validFeedback="Looks good!"
                      invalidFeedback="Please enter a valid Discount."
                      className="input-background"
                    />
                  </Col>

                  <Col xs={6}>
                    <InputField
                      label="Property Name"
                      type="text"
                      placeholder="Property Name"
                      value={propertyFormData.name}
                      name="name"
                      handleSetFormValues={handleSetFormValues}
                      regexPattern={regexValidation.alphaNumericPatternNew}
                      validFeedback="Looks good!"
                      invalidFeedback="Please enter a valid Name."
                      className="input-background"
                    />
                  </Col>

                  <Col xs={6}>
                    <InputField
                      label="Property Location"
                      type="text"
                      placeholder="Property Location"
                      value={propertyFormData.location}
                      name="location"
                      handleSetFormValues={handleSetFormValues}
                      regexPattern={regexValidation.addressLocationPattern}
                      validFeedback="Looks good!"
                      invalidFeedback="Please enter a valid Name."
                      className="input-background"
                    />
                  </Col>

                  <Col xs={6}>
                    <InputField
                      label="Property  Liner"
                      placeholder="Property  Liner"
                      value={propertyFormData.propertyLiner}
                      name="propertyLiner"
                      handleSetFormValues={handleSetFormValues}
                      regexPattern={regexValidation.alphaNumericPatternNew}
                      validFeedback="Looks good!"
                      invalidFeedback="Please enter a valid Name."
                      className="input-background"
                    />
                  </Col>
                  <Col xs={6}>
                    <Form.Group>
                      <Form.Label>Sub Company</Form.Label>
                      <Form.Control
                        size="lg"
                        as="select"
                        placeholder="Sub Company"
                        value={subCompany}
                        onChange={handleInputChange}
                        className="input-background"
                        name="subCompany"
                      >
                        <option value="" disabled selected>
                          Sub Company
                        </option>
                        {getAllSubCompaniesData?.map(subCompany => {
                          if (subCompany.subCompanyName) {
                            return (
                              <option
                                key={subCompany?._id}
                                value={subCompany?.subCompanyName}
                                data-id={subCompany?._id}
                              >
                                {subCompany?.subCompanyName}
                              </option>
                            );
                          }
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group>
                      <Form.Label>Construction Status</Form.Label>
                      <Form.Control
                        size="lg"
                        as="select"
                        placeholder="Construction Status"
                        value={propertyFormData.constructionStatus}
                        onChange={handleInputChange}
                        className="input-background"
                        name="constructionStatus"
                      >
                        <option value="" disabled selected>
                          Choose construction status
                        </option>
                        <option value="New Launch">New Launch</option>
                        <option value="Under Construction">
                          Under Construction
                        </option>
                        <option value="Ready To Move">Ready To Move</option>
                        <option value="Possession Soon">Possession Soon</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group controlId="dateInput" className="mb-4">
                      <Form.Label>Possession Date</Form.Label>
                      <Form.Control
                        disabled={
                          propertyFormData.constructionStatus ===
                          'Ready To Move'
                        }
                        type="date"
                        name="possessionDate"
                        value={propertyFormData.possessionDate}
                        onChange={handleInputChange}
                        placeholder="Enter Posession Date"
                        className="input-background
                        "
                      />
                    </Form.Group>
                  </Col>

                  {/* property type dropdown */}

                  <CreatableSelectWithModal
                    setPropertyFormData={setPropertyFormData}
                    categoryData={getAllPropertyCategoryData}
                  />

                  {/* property type dropdown code en here */}

                  <Col xs={6}>
                    <InputField
                      label="Location Latitude"
                      type="text"
                      placeholder="Location Latitude"
                      value={propertyFormData.latitude}
                      name="latitude"
                      handleSetFormValues={handleSetFormValues}
                      regexPattern={regexValidation.latitudePattern}
                      validFeedback="Looks good!"
                      invalidFeedback="Please enter a valid Latitude."
                      className="input-background"
                    />
                  </Col>

                  <Col xs={6}>
                    <InputField
                      label="Location Longitude"
                      type="text"
                      placeholder="Location Longitude"
                      value={propertyFormData.longitude}
                      name="longitude"
                      handleSetFormValues={handleSetFormValues}
                      regexPattern={regexValidation.longitudePattern}
                      validFeedback="Looks good!"
                      invalidFeedback="Please enter a valid Longitude."
                      className="input-background"
                    />
                  </Col>

                  <Col xs={6}>
                    <CustomCreatableSelect
                      customCreatableSelectName="customCreatableSelectName"
                      label="Amenities"
                      placeholder="Add amenities"
                      type="amenity"
                      data={getAllAmenitiesData}
                      name="amenitiesId"
                      setPropertyFormData={setPropertyFormData}
                    />
                  </Col>

                  {/* <Col xs={6}>
                    <CustomCreatableSelect
                      customCreatableSelectName="customCreatableSelectName"
                      label="Nearby Areas"
                      placeholder="Choose nearby areas"
                      type="nearby"
                      data={getAllNearByAreaData}
                      name="nearByAreaId"
                      setPropertyFormData={setPropertyFormData}
                    />
                  </Col> */}
                  <Col xs={6}>
                    <CustomCreatableSelect
                      customCreatableSelectName="customCreatableSelectName"
                      label="Location Advantages"
                      placeholder="Add location advantages"
                      type="location"
                      data={getAllLocationAdvantageData}
                      name="locationAdvantagesId"
                      setPropertyFormData={setPropertyFormData}
                    />
                  </Col>

                  <Col xs={6}>
                    <CustomCreatableSelect
                      customCreatableSelectName="customCreatableSelectName"
                      label="Loan Approved By"
                      placeholder="Choose loan approved by"
                      type="bank"
                      data={getAllBankData}
                      setPropertyFormData={setPropertyFormData}
                      name="loanApprovedByIds"
                    />
                  </Col>

                  {/* <Col xs={6}>
                    <Form.Group>
                      <Form.Label>Age of Property</Form.Label>
                      <Form.Control
                        size="lg"
                        as="select"
                        placeholder="Age of Property"
                        value={propertyFormData.ageOfProperty}
                        onChange={handleInputChange}
                        className="input-background"
                        name="ageOfProperty"
                      >
                        <option value="" disabled selected>
                          Choose age of property
                        </option>
                        <option value="Under Construction">1 to 5 years</option>
                        <option value="Ready To Move">5 to 10 years</option>
                        <option value="Possession Soon">5 to 15 years</option>
                      </Form.Control>
                    </Form.Group>
                  </Col> */}

                  <Col xs={6}>
                    <QuillEditor
                      name="propertyDescription"
                      label="About The Project"
                      value={propertyFormData.propertyDescription}
                      onChange={setPropertyFormData}
                    />
                  </Col>

                  <Col xs={6}>
                    <QuillEditor
                      name="projectSpecification"
                      label="Project Specification"
                      value={propertyFormData.projectSpecification}
                      onChange={setPropertyFormData}
                    />
                  </Col>
                  <Col xs={12}>
                    <QuillEditor
                      name="termAndCondition"
                      label="Terms & Conditions"
                      value={propertyFormData.termAndCondition}
                      onChange={setPropertyFormData}
                    />
                  </Col>

                  <Col xs={6}></Col>
                  {/* payment milestone */}
                  <PaymentMilestone
                    setPropertyFormData={setPropertyFormData}
                    paymentPlan={propertyFormData.paymentPlan}
                    setFormValidationError={setFormValidationError}
                  />

                  {/* price */}
                  <CurrentlyComparingPrice
                    setPropertyFormData={setPropertyFormData}
                    currentlyComparing={propertyFormData.currentlyComparing}
                    setFormValidationError={setFormValidationError}
                  />
                  <Col xs={12}>
                    {isAddPropertyDetailsIsError && <ErrorMessage />}
                  </Col>
                  {formValidationError && (
                    <Col xs={12}>
                      {' '}
                      <p className="text-danger">{formValidationError}</p>
                    </Col>
                  )}
                  <Col
                    xs={12}
                    className="d-flex justify-content-end gap-3 mt-5"
                  >
                    <CustomButton
                      isDisabled={isAddPropertyDetailsLoading}
                      customButtonClass="custom-button-primary rounded-2 py-2 px-5"
                    >
                      {isAddPropertyDetailsLoading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        'Next'
                      )}
                    </CustomButton>

                    {/* <CustomButton customButtonClass="custom-button-secondary rounded-2 px-5">
                      Back
                    </CustomButton> */}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Form>
      </>
    );
  }
};

export default AddProperty;
