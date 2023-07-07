import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import "./BuilderPop.css";

import { Col, Form, Row } from "react-bootstrap";
import { apiEndpoints } from "../BuilderApi/BuilderApiEndpoint";
import { postAPI, putAPI } from "../BuilderApi/BuilderApiRequest";
import { Button, Container } from "react-bootstrap";
import FileUploader from "../../../../components/file-uploader/FileUploader";
import { InputField } from "../../../../components";
import QuillEditor from "../../../../components/quill-editor/QuillEditor";

const BuilderPop = (props) => {
  const [name, setName] = useState(props.builder.name);
  const [locationOfProperty, setLocationOfProperty] = useState(
    props.builder.locationOfProperty
  );
  const [address, setAddress] = useState(props.builder.address);
  const [companyType, setCompanyType] = useState(props.builder.companyName);
  const [panOfCompany, setPanOfCompany] = useState(props.builder.panOfCompany);
  const [phoneNumber, setPhoneNumber] = useState(props.builder.phoneNumber);
  const [companyName, setCompanyName] = useState(props.builder.companyName);
  const [gst, setGst] = useState(props.builder.gst);
  // const [description, setDescription] = useState(props.builder.description);
  const [descriptionData, setDescriptionData] = useState({
    description: props.builder.description,
  });
  const [projectName, setProjectName] = useState(props.builder.projectName);
  const [email, setEmail] = useState(props.builder.email);
  const [profilePicture, setProfilePictureFiles] = useState([
    props.builder.profilePictureUrl,
  ]);
  const [document, setDocumentFiles] = useState(props.builder.documents);
  const [logo, setLogoFiles] = useState([props.builder.logoUrl]);
  const [typeOfProperty, setTypeOfProperty] = useState(
    props.builder.typeOfProperty
  );
  console.log(props.builder);

  const onResetHandler = () => {
    setName("");
    setLocationOfProperty("");
    setCompanyType("");
    setPanOfCompany("");
    setPhoneNumber("");
    setCompanyName("");
    setGst("");
    // setDescription('');
    setTypeOfProperty("");
    setEmail("");
    setProjectName("");
    setAddress("");
  };

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

  const onSubmitHandler = async () => {
    if (phoneNumber.length !== 10) {
      return;
    }
    const formData = {
      id: props.builder._id,
      name,
      locationOfProperty,
      companyType,
      panOfCompany,
      phoneNumber,
      companyName,
      gst,
      description: descriptionData.description,

      projectName: "",
      // email,
      typeOfProperty: "",

      // projectName,
      email,
      // typeOfProperty,

      // address: locationOfProperty,
      address,
    };

    console.log(formData);
    // return;
    const response = await putAPI(
      apiEndpoints.updateBuilder,

      formData
    );
    console.log(response);
    console.log(response.data ?? []);
  };

  return (
    <>
      <section className="NESTO__admin__main__add__property__section  m-3 px-4 py-4">
        <Container>
          <div
            {...props}
            onHide={() => {
              props.onChange(false);
            }}
          >
            <Row>
              <Col xs={4}>
                <h1 className="file-upload-title">Upload Profile Image</h1>
                <FileUploader
                  files={profilePicture}
                  setFiles={setProfilePictureFiles}
                />
              </Col>
              <Col xs={4}>
                <h1 className="file-upload-title">Upload your Business Logo</h1>
                <FileUploader files={logo} setFiles={setLogoFiles} />
              </Col>
              <Col xs={4}>
                <h1 className="file-upload-title">Upload your documents</h1>

                <FileUploader files={document} setFiles={setDocumentFiles} />
              </Col>
            </Row>
            <Col xs={12}>
              <hr className="custom-divider" />
            </Col>
            <Row className="gy-4">
              <Col xs={6}>
                <InputField
                  label="Builder Name*"
                  type="text"
                  placeholder="Builder Name*"
                  value={name}
                  inputName="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  InputFieldClassName="input-background"
                />
              </Col>
              <Col xs={6}>
                <InputField
                  label="Location"
                  type="text"
                  placeholder="Location"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  InputFieldClassName="input-background"
                />
              </Col>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Company Type*</Form.Label>
                  <Form.Control
                    size="lg"
                    as="select"
                    placeholder="Enter company type"
                    value={companyType}
                    onChange={(e) => {
                      setCompanyType(e.target.value);
                    }}
                    className="input-background"
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
                  label="Company PAN*"
                  type="text"
                  placeholder="Enter company PAN"
                  value={panOfCompany}
                  onChange={(e) => {
                    setPanOfCompany(e.target.value);
                  }}
                  InputFieldClassName="input-background"
                />
              </Col>
              <Col xs={6}>
                <InputField
                  label="Phone Number"
                  type="text"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  inputName="phoneNumber"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  InputFieldClassName="input-background"
                />
              </Col>
              <Col xs={6}>
                <InputField
                  label="Email*"
                  type="text"
                  placeholder="Email*"
                  value={email}
                  inputName="email"
                  onChange={(e) => setEmail(e.target.value)}
                  InputFieldClassName="input-background"
                />
              </Col>
              <Col xs={12}>
                <QuillEditor
                  name="description"
                  label="About the Builder*"
                  value={
                    descriptionData.description
                      ? descriptionData.description
                      : ""
                  }
                  onChange={setDescriptionData}
                />
                {/* {console.log(description)} */}
              </Col>
            </Row>

            <div className="builder-details_btn_div d-flex gap-2">
              <button className="builder-details_btn" onClick={onSubmitHandler}>
                Update
              </button>
              <button className="builder-details_btn" onClick={onResetHandler}>
                Reset
              </button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default BuilderPop;
