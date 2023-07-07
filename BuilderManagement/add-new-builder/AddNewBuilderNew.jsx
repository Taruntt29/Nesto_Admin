import React, { useEffect, useState } from "react";
import FormData from "form-data";
import { Form, Row, Col, Container } from "react-bootstrap";
import FileUploader from "../../../../components/file-uploader/FileUploader";
import QuillEditor from "../../../../components/quill-editor/QuillEditor";
// import { CustomButton, ErrorMessage, InputField } from '../../../../components';
import { CustomButton, ErrorMessage } from "../../../../components";
import { usePostMutation } from "../../../../hooks/tanstackQuery";
import { apiEndpoints } from "../../../../config/apiEndpoints";
import { useDispatch } from "react-redux";
import {
  setBuilderId,
  setBuilderOnBoardingStep,
} from "../../../../store/store";
import { formValuesValidator } from "../../../../helper/helperFunction";
import InputField from "../../../../components/form/InputField-2/InputField";
import { regexValidation } from "../../../../config/regex";

const AddNewBuilder = ({ setAddNewBuilderSteps }) => {
  const dispatch = useDispatch();
  const [profilePicture, setProfilePictureFiles] = useState([]);
  const [document, setDocumentFiles] = useState([]);
  const [logo, setLogoFiles] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    description: "",
    companyName: "",
    companyType: "",
    gst: "",
    panOfCompany: "",
    address: "",
  });
  const [phoneNumberExit, setPhoneNumberExit] = useState(false);

  const {
    mutate: addNewBuilder,
    isLoading: isAddNewBuilderLoading,
    isError: isAddNewBuilderIsError,
    data: addNewBuilderData,
    isSuccess: isAddNewBuilderSuccess,
    refetch: getAllpropertyRefetch,
  } = usePostMutation(apiEndpoints.addBuilder, "getAllproperty");

  const handleSetFormValues = (name, value) =>
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    if (!formValuesValidator(formValues)) {
      return false;
    }
    console.log(formValues);

    const formData = new FormData();
    for (let i = 0; i < profilePicture.length; i++) {
      formData.append("profilePicture", profilePicture[i]);
    }
    for (let i = 0; i < logo.length; i++) {
      formData.append("logo", logo[i]);
    }
    for (let i = 0; i < document.length; i++) {
      formData.append("documents", document[i]);
    }
    // formData.append('brochure', brochure);

    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(
        key,
        Array.isArray(value) ? JSON.stringify(value) : value
      );
    });

    console.log(Array.from(formData));

    addNewBuilder(formData);
  };

  useEffect(() => {
    if (
      isAddNewBuilderSuccess &&
      addNewBuilderData &&
      Object.keys(addNewBuilderData).length > 0
    ) {
      dispatch(setBuilderOnBoardingStep(true));
      dispatch(setBuilderId(addNewBuilderData?._id));
      setPhoneNumberExit(false);
    } else {
      setPhoneNumberExit(true);
    }
  }, [isAddNewBuilderSuccess, addNewBuilderData, dispatch]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Container className="NESTO__admin__main__add__property__section NESTO__admin__main__add__property__form m-3 px-4 py-2 pb-5">
          <Row>
            <Col xs={12}>
              <Row className="gy-4">
                <Col xs={12}>
                  <Row className="mt-4">
                    <Col xs={4}>
                      <h1 className="file-upload-title">
                        Upload Profile Image
                      </h1>
                      <FileUploader
                        files={profilePicture}
                        setFiles={setProfilePictureFiles}
                      />
                    </Col>
                    <Col xs={4}>
                      <h1 className="file-upload-title">
                        Upload your Business Logo
                      </h1>
                      <FileUploader files={logo} setFiles={setLogoFiles} />
                    </Col>
                    <Col xs={4}>
                      <h1 className="file-upload-title">
                        Upload your documents
                      </h1>

                      <FileUploader
                        files={document}
                        setFiles={setDocumentFiles}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col xs={12}>
                  <hr className="custom-divider" />
                </Col>

                <Col xs={6}>
                  <InputField
                    id="name"
                    label="Builder Name*"
                    type="text"
                    placeholder="Builder Name*"
                    name="name"
                    value={formValues.name}
                    handleSetFormValues={handleSetFormValues}
                    // regexPattern={regexValidation.namePattern}
                    // validFeedback="Looks good!"
                    // invalidFeedback="Please enter a valid Name."
                    className="input-background"
                  />
                </Col>

                <Col xs={6}>
                  <InputField
                    id="email"
                    label="Email*"
                    type="text"
                    placeholder="Email*"
                    name="email"
                    value={formValues.email}
                    handleSetFormValues={handleSetFormValues}
                    regexPattern={regexValidation.emailPattern}
                    validFeedback="Looks good!"
                    invalidFeedback="Please enter a valid Email."
                    className="input-background"
                  />
                </Col>

                <Col xs={6}>
                  <InputField
                    id="phoneNumber"
                    label="Phone Number"
                    type="text"
                    placeholder="Enter phone number"
                    name="phoneNumber"
                    value={formValues.phoneNumber}
                    handleSetFormValues={handleSetFormValues}
                    regexPattern={regexValidation.numberPattern}
                    validFeedback="Looks good!"
                    invalidFeedback="Please enter a valid Phone Number."
                    className="input-background"
                  />
                </Col>

                <Col xs={6}>
                  <InputField
                    id="companyName"
                    label="Company Name"
                    type="text"
                    placeholder="Enter company Name"
                    name="companyName"
                    value={formValues.companyName}
                    handleSetFormValues={handleSetFormValues}
                    regexPattern={regexValidation.namePattern}
                    validFeedback="Looks good!"
                    invalidFeedback="Please enter a valid Name."
                    className="input-background"
                  />
                </Col>

                <Col xs={6}>
                  <InputField
                    id="location"
                    label="Location"
                    type="text"
                    placeholder="Location"
                    name="address"
                    value={formValues.address}
                    handleSetFormValues={handleSetFormValues}
                    regexPattern={regexValidation.namePattern}
                    validFeedback="Looks good!"
                    invalidFeedback="Please enter a valid Name."
                    className="input-background"
                  />
                </Col>

                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Company Type*</Form.Label>
                    <Form.Control
                      size="lg"
                      as="select"
                      placeholder="Enter company type"
                      value={formValues.companyType}
                      onChange={(e) =>
                        setFormValues((prevFormValues) => ({
                          ...prevFormValues,
                          [e.target.name]: e.target.value,
                        }))
                      }
                      className="input-background"
                      name="companyType"
                    >
                      <option value="" disabled selected>
                        Select Company Type
                      </option>
                      <option value="proprietorship">Proprietorship</option>
                      <option value="individual">Individual</option>
                      <option value="partnership">Partnership</option>
                      <option value="llc">LLC</option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col xs={6}>
                  <InputField
                    id="gst"
                    label="Company GST*"
                    type="text"
                    placeholder="Enter company GST*"
                    name="gst"
                    value={formValues.gst}
                    handleSetFormValues={handleSetFormValues}
                    regexPattern={regexValidation.gstPattern}
                    validFeedback="Looks good!"
                    invalidFeedback="Please enter a valid GST Number."
                    className="input-background"
                  />
                </Col>

                <Col xs={6}>
                  <InputField
                    id="panOfCompany"
                    label="Company PAN*"
                    type="text"
                    placeholder="Enter company PAN"
                    name="panOfCompany"
                    value={formValues.panOfCompany}
                    handleSetFormValues={handleSetFormValues}
                    regexPattern={regexValidation.panPattern}
                    validFeedback="Looks good!"
                    invalidFeedback="Please enter a valid PAN Number."
                    className="input-background"
                  />
                </Col>

                <Col xs={12}>
                  <QuillEditor
                    name="description"
                    label="About the Builder*"
                    value={formValues.description}
                    onChange={setFormValues}
                  />
                </Col>

                <Col xs={6}></Col>

                <Col xs={12}>{isAddNewBuilderIsError && <ErrorMessage />}</Col>
                <Col xs={12} className="d-flex justify-content-end gap-3 mt-5">
                  <CustomButton
                    isDisabled={isAddNewBuilderLoading}
                    customButtonClass="custom-button-primary rounded-2 px-5"
                  >
                    {isAddNewBuilderLoading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      "Add"
                    )}
                  </CustomButton>
                  <CustomButton customButtonClass="custom-button-outline-primary rounded-2 px-5">
                    Reset
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

export default AddNewBuilder;
