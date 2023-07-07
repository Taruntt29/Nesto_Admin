import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './AddDsaFirstStep.css';
import galleryAdd from '../../../../assets/images/dsa/gallery-add.svg';
import dots from '../../../../assets/images/dsa/dots.png';

function AddDsaFirstStep(props) {
  const [documentfile, setDocumentFile] = useState('');
  const handleChangeDocument = e => {
    setDocumentFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <Modal
        {...props}
        dialogClassName="modal-90w OnBoardingProDta"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          {' '}
          <div className="HdingDta">
            <h4>Add Dsa</h4>
          </div>{' '}
        </Modal.Header>
        <Modal.Body>
          <div className="col-12">
            <div className="col-12">
              <div className="row">
                <div className="col-3">
                  <div className="ProList">
                    <ul>
                      <li className="">
                        {' '}
                        <span className="Crlce ProList-circle_active">1</span>
                        <small className="MrLft"> Onboarding </small>
                      </li>
                      <li>
                        {' '}
                        <span className="Crlce">2</span>{' '}
                        <small className="MrLft"> Details </small>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-9">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-12 second-pop_img_upload_div">
                        <label for="uplodDcoument" className="upldName">
                          {' '}
                          Upload Documents{' '}
                        </label>
                        <div className="BcImgDta">
                          <div className="UplodPhoto">
                            <label for="uplodDcoument" className="">
                              <input
                                type="file"
                                onChange={handleChangeDocument}
                                id="uplodDcoument"
                              />
                              <div className="UploadImg">
                                {' '}
                                <img src={galleryAdd} alt="Gallery Add" />{' '}
                              </div>
                              <span className="UpldImages">
                                {' '}
                                Upload your <br /> photo
                              </span>
                            </label>
                          </div>

                          <div className="BcImgDtaShow">
                            <div className="ImgDtaProflm">
                              <img src={documentfile ? documentfile : dots} />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Upload Image End =================
                                            ================================== */}
                      {/* Inputs Start ==========
                                            ======================= */}
                      <div className="col-6 mt-4">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>DSA Name</Form.Label>
                          <Form.Control
                            className="AddDsaSecondStep_input"
                            type="text"
                            placeholder="Enter DSA name"
                          />
                        </Form.Group>
                      </div>
                      <div className="col-6 mt-4">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            className="AddDsaSecondStep_input"
                            type="text"
                            placeholder="Enter Phone Number"
                          />
                        </Form.Group>
                      </div>

                      <div className="col-6">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Contact number</Form.Label>
                          <Form.Control
                            className="AddDsaSecondStep_input"
                            type="number"
                            placeholder="Please enter your contact number"
                          />
                        </Form.Group>
                      </div>

                      <div className="col-6">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            className="AddDsaSecondStep_input"
                            type="email"
                            placeholder="Please enter your email"
                          />
                        </Form.Group>
                      </div>
                    </div>

                    <div className="builder-details_btn_div d-flex gap-2">
                      <button className="builder-details_btn">Next</button>
                      <button className="builder-details_btn">Reset</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddDsaFirstStep;
