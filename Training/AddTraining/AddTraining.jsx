import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import galleryAdd from '../../../../assets/images/dsa/gallery-add.svg';
import dots from '../../../../assets/images/dsa/dots.png';

function AddTraining(props) {
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
                        <h4>Add Training</h4>
                    </div>{' '}
                </Modal.Header>
                <Modal.Body>
                    <div className="col-12">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-12 second-pop_img_upload_div">
                                                <label for="uplodDcoument" className="upldName">
                                                    {' '}
                                                    Upload Video  Thumbnail{' '}
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
                                                                Upload Video <br /> Thumbnail
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
                                                    <Form.Label>Training Name*</Form.Label>
                                                    <Form.Control
                                                        className="AddDsaSecondStep_input"
                                                        type="text"
                                                        placeholder="Enter training Name"
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className="col-6 mt-4">
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Training Except*</Form.Label>
                                                    <Form.Control
                                                        className="AddDsaSecondStep_input"
                                                        type="text"
                                                        placeholder="Enter training except"
                                                    />
                                                </Form.Group>
                                            </div>

                                            <div className="col-6">
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Video Link*</Form.Label>
                                                    <Form.Control
                                                        className="AddDsaSecondStep_input"
                                                        type="text"
                                                        placeholder="Enter video link"
                                                    />
                                                </Form.Group>
                                            </div>
                                        </div>

                                        <div className="builder-details_btn_div d-flex gap-2">
                                            <button className="builder-details_btn">Add</button>
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

export default AddTraining;