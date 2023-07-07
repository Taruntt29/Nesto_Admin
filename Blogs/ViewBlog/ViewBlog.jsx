import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './ViewBlog.css';
import galleryAdd from '../../../../assets/images/header/headerProfile.svg';
import editIcon from '../../../../assets/images/editIcon.svg';

function ViewBlog(props) {
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
                                                    Upload Profile Image{' '}
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
                                            <div className='col-lg-6'>
                                                <label for="uplodproImg" className="upldName">
                                                    {' '}
                                                    Upload Thumbnail Image{' '}
                                                </label>
                                                <div className="blog-view_div-1">
                                                    <div className="blog-view_div-2">
                                                        <label for="uplodproImg" className="">
                                                            <input
                                                                type="file"
                                                                onChange={handleChangeThumbImg}
                                                                id="uplodproImg"
                                                            />
                                                            <div className="UploadImg">
                                                                {' '}
                                                                <img src={thumbImg ? thumbImg : galleryAdd} alt="Profile Img" className='profileImg' />{' '}
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
                                                <Form.Label>Blog Name*</Form.Label>
                                                <Form.Control
                                                    className="AddDsaSecondStep_input"
                                                    type="text"
                                                    placeholder="Enter DSA name"
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col-6 mt-4">
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Blog Date*</Form.Label>
                                                <Form.Control
                                                    className="AddDsaSecondStep_input"
                                                    type="date"
                                                    placeholder="Enter Phone Number"
                                                />
                                            </Form.Group>
                                        </div>

                                        <div className="col-6">
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Posted by - Name*</Form.Label>
                                                <Form.Control
                                                    className="AddDsaSecondStep_input"
                                                    type="text"
                                                    placeholder="Please enter your contact number"
                                                />
                                            </Form.Group>
                                        </div>

                                        <div className="col-6">
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Description*</Form.Label>
                                                <Form.Control
                                                    className="AddDsaSecondStep_input"
                                                    type="text"
                                                    placeholder="Please enter your email"
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

export default ViewBlog;
