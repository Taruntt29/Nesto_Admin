import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './AddBlog.css';
import axios from 'axios';
import galleryAdd from '../../../../assets/images/dsa/gallery-add.svg';
import dots from '../../../../assets/images/dsa/dots.png';
import { BASE_URL } from '../../../../../config';
import { postAPI } from '../../BuilderManagement/BuilderApi/BuilderApiRequest';
import { apiEndpoints } from '../../BuilderManagement/BuilderApi/BuilderApiEndpoint';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { CloseButton } from 'react-bootstrap';
import { TextEditor } from '../../../../components/TestEditor/TextEditor';
import { Editor, EditorTools, EditorUtils } from '@progress/kendo-react-editor';
import QuillEditor from '../../../../components/quill-editor/QuillEditor';

function AddBlog(props) {
    const [validation, setValidation] = useState({});
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const body1 = React.createRef();
    const [profileImage, setProfileImage] = useState("");
    const [thumbnailImage, setThumbnailImage] = useState("");
    const [blogName, setBlogName] = useState("");
    const [blogDate, setBlogDate] = useState("");
    const navigate = useNavigate();
    const [postedByName, setPostedByName] = useState("");
    const [excerpt, setExcerpt] = useState("");
    // const [description, setDescription] = useState("");
    const [descriptionData, setDescription] = useState({
        description: ''
    })
    const [isDeleted, setIsDeleted] = useState("");
    const [proImg, setProImg] = useState('');

    const handleProChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const [thumbImg, setThumbImg] = useState('');
    const handleThumbChange = (e) => {
        setThumbnailImage(e.target.files[0]);
    };

    const handleDescription = (e) => {
        const { name, value } = e.target;
        console.log(name, "name")
        console.log(value, "values")
        setDescription(prevDescription => ({
            ...prevDescription, [name]: value
        }))
    }

    const handleClose = () => setShow(false);

    const onResetHandler = () => {
        setProfileImage("");
        setThumbnailImage("");
        setBlogName("");
        setBlogDate("");
        setPostedByName("");
        setDescription("");
        setIsDeleted("");
    }

    const validateAndSubmit = async () => {
        const formData = new FormData();
        formData.append('profileImage', profileImage);
        formData.append('thumbnailImage', thumbnailImage);
        formData.append('blogName', blogName);
        formData.append("blogDate", blogDate);
        formData.append("postedByName", postedByName);
        formData.append("description", descriptionData.description);
        formData.append("excerpt", excerpt);

        const _validation = {}
        if (thumbnailImage === '') {
            _validation["thumbnailImage"] = 'Thumbnail Image is required.'
        }

        if (profileImage === '') {
            _validation["profileImage"] = 'Profile Image is required.'
        }

        if (blogName === '') {
            _validation["blogNameError"] = 'Blog Name is required.'
        }
        if (blogDate === '') {
            _validation["blogDateError"] = 'Blog Date is required.'
        }
        if (postedByName === '') {
            _validation["postByNameError"] = 'Poster Name is required.'
        }
        if (excerpt === '') {
            _validation["excerptError"] = 'excerpt is required.'
        }

        console.log(_validation, "validations");
        setValidation(_validation)
        await axios.post(BASE_URL + apiEndpoints.addBlog, formData)
            .then((response) => {
                console.log(response, "blog added success--->")
                if (response.data.code == '200') {
                    toast.success(response.data.message)
                    props.onHide();
                }
            })
            .catch((error) => {
                console.log(error.response, "hello errors");
            })
    }

    const onSubmitHandler = async (e) => {
        setValidation({});
        validateAndSubmit();
    }


    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                dialogClassName="modal-90w OnBoardingProDta"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    {' '}
                    <div className="HdingDta">
                        <h4>Add Blog</h4>
                    </div>{' '}
                </Modal.Header>
                <Modal.Body>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-6 second-pop_img_upload_div">
                                <label for="proImg" className="upldName">
                                    {' '}
                                    Upload  Profile Image{' '}
                                </label>
                                <div className="BcImgDta">
                                    <div className="UplodPhoto">
                                        <label for="proImg" className="">
                                            <input
                                                type="file"
                                                onChange={handleProChange}
                                                id="proImg"
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
                                            {profileImage && URL.createObjectURL(profileImage) ?
                                                <img src={profileImage && URL.createObjectURL(profileImage)} /> : ""}
                                        </div>
                                    </div>
                                </div>
                                {validation?.profileImage && <span className='text-danger'>{validation?.profileImage}</span>}
                            </div>
                            <div className="col-6 second-pop_img_upload_div">
                                <label for="thumbImg" className="upldName">
                                    {' '}
                                    Upload Thumbnail Image{' '}
                                </label>
                                <div className="BcImgDta">
                                    <div className="UplodPhoto">
                                        <label for="thumbImg" className="">
                                            <input
                                                type="file"
                                                onChange={handleThumbChange}
                                                id="thumbImg"
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
                                            {thumbnailImage && URL.createObjectURL(thumbnailImage) ?
                                                <img src={thumbnailImage && URL.createObjectURL(thumbnailImage)} /> : ""}
                                        </div>
                                    </div>
                                </div>
                                {validation?.thumbnailImage && <span className='text-danger'>{validation?.thumbnailImage}</span>}
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
                                        placeholder="Enter blog name"
                                        value={blogName}
                                        onChange={(e) => {
                                            setBlogName(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                                {validation?.blogNameError && <span className='text-danger'>{validation?.blogNameError}</span>}
                            </div>

                            <div className="col-6 mt-4">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Blog Date*</Form.Label>
                                    <Form.Control
                                        className="AddDsaSecondStep_input"
                                        type="date"
                                        // placeholder="Enter Phone Number"
                                        value={blogDate}
                                        onChange={(e) => {
                                            setBlogDate(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                                {validation?.blogDateError && <span className='text-danger'>{validation?.blogDateError}</span>}
                            </div>

                            <div className="col-6">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Posted by - Name*</Form.Label>
                                    <Form.Control
                                        className="AddDsaSecondStep_input"
                                        type="text"
                                        placeholder="Enter posted by - name"
                                        value={postedByName}
                                        onChange={(e) => {
                                            setPostedByName(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                                {validation?.postByNameError && <span className='text-danger'>{validation?.postByNameError}</span>}
                            </div>

                            <div className="col-6">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Excerpt*</Form.Label>
                                    <Form.Control
                                        className="AddDsaSecondStep_input"
                                        type="text"
                                        placeholder="Enter description"
                                        value={excerpt}
                                        onChange={(e) => {
                                            setExcerpt(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                                {validation?.excerptError && <span className='text-danger'>{validation?.excerptError}</span>}
                            </div>
                        </div>
                        <div>
                            <QuillEditor
                                name="description"
                                label="About The Project"
                                value={descriptionData.description}
                                onChange={setDescription}
                            />
                            {/* {formData.firstNameError && <span className='text-danger'>{formData.firstNameError}</span>} */}
                        </div>
                        {/* <div>
                            <label>Description</label>
                            <TextEditor
                                value={description}
                                ref={body1}
                                onChange={handleDescription}
                            />
                        </div> */}
                        <div className="builder-details_btn_div d-flex gap-2">
                            <button className="builder-details_btn" onClick={onSubmitHandler} >Update</button>
                            <button className="builder-details_btn" onClick={onResetHandler}>Reset</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </>
    );
};

export default AddBlog;