import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './AddDsaSecondStep.css'
import { TiTick } from 'react-icons/ti'

function AddDsaSecondStep(props) {
    return (
        <>
            <Modal
                {...props}
                dialogClassName="modal-90w OnBoardingProDta"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    {" "}
                    <div className="HdingDta">
                        <h4>Add Dsa</h4>
                    </div>{" "}
                </Modal.Header>
                <Modal.Body>
                    <div className="col-12">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-3">
                                    <div className="AddDsaSecondStep-proList">
                                        <ul>
                                            <li className="">
                                                {" "}
                                                <span className="AddDsaSecondStep-circle AddDsaSecondStep-circle_done">
                                                    <TiTick />
                                                </span>
                                                <small className="MrLft"> Onboarding </small>
                                            </li>
                                            <li>
                                                {" "}
                                                <span className="AddDsaSecondStep-circle AddDsaSecondStep-circle_active">2</span>{" "}
                                                <small className="MrLft"> Details </small>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-9">
                                    <div className="col-12">
                                        <div className="row">
                                            {/* Inputs Start ==========
                                            ======================= */}
                                            <div className="col-6">
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Area of Operations</Form.Label>
                                                    <Form.Control
                                                        className="AddDsaSecondStep_input"
                                                        type="text"
                                                        placeholder="Enter area of operations"
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className="col-6">
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Bank Associations</Form.Label>
                                                    <Form.Control
                                                        className="AddDsaSecondStep_input"
                                                        type="text"
                                                        placeholder="Enter bank asscoiations"
                                                    />
                                                </Form.Group>
                                            </div>

                                            <div className="col-6 ">
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Loan  Range</Form.Label>
                                                    <select className=" AddDsaSecondStep_input form-select" aria-label="Default select example">
                                                        <option selected>Choose loan range</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </select>
                                                </Form.Group>
                                            </div>
                                        </div>

                                        <div className='builder-details_btn_div d-flex gap-2'>
                                            <button className='builder-details_btn'>Next</button>
                                            <button className='builder-details_btn'>Reset</button>
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

export default AddDsaSecondStep;