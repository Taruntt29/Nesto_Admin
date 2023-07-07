import React, { useEffect, useState } from 'react';
import FormData from 'form-data';
import { Form, Row, Col, Container } from 'react-bootstrap';
import { usePostMutation } from '../../../../../hooks/tanstackQuery';
import { apiEndpoints } from '../../../../../config/apiEndpoints';
import FileUploader from '../../../../../components/file-uploader/FileUploader';
import { CustomButton, InputField } from '../../../../../components';

const SubCompany = () => {
  const [documents, setDocumentsFiles] = useState([]);
  const [addSubCompanyFormData, setAddSubCompanyFormData] = useState({
    subCompanyName: '',
    represnetativeName: '',
    contactNumber: '',
    email: '',
    gst: '',
    pan: '',
    documents,
  });

  const {
    mutate: addSubCompany,
    isLoading: isAddSubCompanyLoading,
    isError: isAddSubCompanyIsError,
    data: addSubCompanyData,
    isSuccess: isAddSubCompanySuccess,
    refetch: getAllpropertyRefetch,
  } = usePostMutation(apiEndpoints.addSubCompany, 'getallsubcompany');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setAddSubCompanyFormData({ ...addSubCompanyFormData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    addSubCompany(payload);

    setAddSubCompanyFormData(
      Object.keys(addSubCompanyFormData).reduce(
        (acc, key) => ({ ...acc, [key]: '' }),
        {}
      )
    );
    setDocumentsFiles([]);
  };

  if (isAddSubCompanySuccess) {
    console.log(addSubCompanyData);
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Container className="NESTO__admin__main__add__property">
          <Row>
            <Col xs={12}>
              <h1 className="NESTO__admin__main__title pt-3 mb-2">
                Sub Company
              </h1>
            </Col>
            <Col xs={12} className="mt-4">
              <Row className="gy-4">
                <Col xs={12}>
                  <Row>
                    <Col xs={12}>
                      <h1 className="file-upload-title">
                        Upload your documents
                      </h1>

                      <FileUploader
                        files={documents}
                        setFiles={setDocumentsFiles}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col xs={12}>
                  <hr className="custom-divider" />
                </Col>

                <Col xs={6}>
                  <InputField
                    label="Sub Company Name"
                    type="text"
                    placeholder="Sub Company Name*"
                    value={addSubCompanyFormData.subCompanyName}
                    inputName="subCompanyName"
                    onChange={handleInputChange}
                    InputFieldClassName="input-background"
                  />
                </Col>

                <Col xs={6}>
                  <InputField
                    label="Represnetative Name"
                    type="text"
                    placeholder="Represnetative Name"
                    value={addSubCompanyFormData.represnetativeName}
                    inputName="represnetativeName"
                    onChange={handleInputChange}
                    InputFieldClassName="input-background"
                  />
                </Col>
                <Col xs={6}>
                  <InputField
                    label="Contact Number"
                    type="text"
                    placeholder="Enter Contact Number"
                    value={addSubCompanyFormData.contactNumber}
                    inputName="contactNumber"
                    onChange={handleInputChange}
                    InputFieldClassName="input-background"
                  />
                </Col>
                <Col xs={6}>
                  <InputField
                    label="Email"
                    type="text"
                    placeholder="Enter Email"
                    value={addSubCompanyFormData.email}
                    inputName="email"
                    onChange={handleInputChange}
                    InputFieldClassName="input-background"
                  />
                </Col>
                <Col xs={6}>
                  <InputField
                    label="Gst"
                    type="text"
                    placeholder="Enter Gst"
                    value={addSubCompanyFormData.gst}
                    inputName="gst"
                    onChange={handleInputChange}
                    InputFieldClassName="input-background"
                  />
                </Col>

                <Col xs={6}>
                  <InputField
                    label="Pan"
                    type="text"
                    placeholder="Enter PAN"
                    value={addSubCompanyFormData.pan}
                    inputName="pan"
                    onChange={handleInputChange}
                    InputFieldClassName="input-background"
                  />
                </Col>

                <Col xs={6}></Col>

                {isAddSubCompanyIsError && (
                  <Col xs={12}>
                    <ErrorMessage />
                  </Col>
                )}

                {isAddSubCompanySuccess && (
                  <Col xs={12}>
                    <span>Sub Company Added</span>
                  </Col>
                )}

                <Col xs={12} className="d-flex justify-content-end gap-3 mt-5">
                  <CustomButton
                    isDisabled={isAddSubCompanyLoading}
                    customButtonClass="custom-button-primary rounded-2 px-5 "
                  >
                    {isAddSubCompanyLoading ? (
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

export default SubCompany;
