import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import galleryAdd from '../../../../assets/images/header/headerProfile.svg';
import editIcon from '../../../../assets/images/editIcon.svg';

function EditTraining(props) {
    const [proImg, setProImg] = useState('');
    const [thumbImg, setThumbImg] = useState('');
    const handleChangeProImg = e => {
        setProImg(URL.createObjectURL(e.target.files[0]));
    };
    const handleChangeThumbImg = e => {
        setThumbImg(URL.createObjectURL(e.target.files[0]));
    }

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
                        <h4>Lorem Ipsum Blog Name</h4>
                    </div>{' '}
                </Modal.Header>
                <Modal.Body>
                    <div className="col-12">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12" >
                                    {/* <div className="col-12"> */}
                                    <div className="row">
                                        <div className="col-12 blog-view_col">
                                            <div className='col-lg-6'>
                                                <label for="uplodproImg" className="upldName">
                                                    {' '}
                                                    Upload Video Thumbnail{' '}
                                                </label>
                                                <div className="blog-view_div-1">
                                                    <div className="blog-view_div-2">
                                                        <label for="uplodproImg" className="">
                                                            <input
                                                                type="file"
                                                                onChange={handleChangeProImg}
                                                                id="uplodproImg"
                                                            />
                                                            <div className="UploadImg">
                                                                {' '}
                                                                <img src={proImg ? proImg : galleryAdd} alt="Profile Img" className='profileImg' />{' '}
                                                            </div>
                                                            <img src={editIcon} alt='edit' className='edit_icon' />
                                                        </label>
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
                                                    placeholder="Lorem Ipsum"
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col-6 mt-4">
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Training Except*</Form.Label>
                                                <Form.Control
                                                    className="AddDsaSecondStep_input"
                                                    type="text"
                                                    placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting....."
                                                />
                                            </Form.Group>
                                        </div>

                                        <div className="col-6">
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Video Link*</Form.Label>
                                                <Form.Control
                                                    className="AddDsaSecondStep_input"
                                                    type="text"
                                                    placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting....."
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <div className="builder-details_btn_div d-flex gap-2">
                                        <button className="builder-details_btn">Update</button>
                                        <button className="builder-details_btn">Reset</button>
                                    </div>
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditTraining;