import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function EditQA(props) {
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
                        <h4>Edit Q & A</h4>
                    </div>{' '}
                </Modal.Header>
                <Modal.Body>
                    <div className="col-12">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12" >
                                    {/* <div className="col-12"> */}
                                    <div className="row">
                                        {/* Upload Image End =================
                                            ================================== */}
                                        {/* Inputs Start ==========
                                            ======================= */}
                                        <div className="col-6">
                                            <Form.Group className="mb-3">
                                                <Form.Label for='question'>Question</Form.Label>
                                                <Form.Control as="textarea" rows={6}
                                                    id='question'
                                                    className='AddDsaSecondStep_input'
                                                    placeholder='Lorem Ipsum is simply dummy text of the printing and typesetting.....'
                                                />
                                            </Form.Group>
                                        </div>

                                        <div className="col-6">
                                            <Form.Group className="mb-3">
                                                <Form.Label for='answer'>Answer</Form.Label>
                                                <Form.Control as="textarea" rows={6}
                                                    id='answer'
                                                    className='AddDsaSecondStep_input'
                                                    placeholder='Lorem Ipsum is simply dummy text of the printing and typesetting.....'
                                                />
                                            </Form.Group>
                                        </div>
                                        <span>Choose</span>
                                        <div className='d-flex gap-5'>
                                            <Form.Group className="d-flex gap-2 mt-2">
                                                <Form.Check id='builder' checked />
                                                <Form.Label for='builder'>Builder</Form.Label>
                                            </Form.Group>
                                            <Form.Group className="d-flex gap-2 mt-2">
                                                <Form.Check id='broker' />
                                                <Form.Label for='broker'>Broker</Form.Label>
                                            </Form.Group>
                                            <Form.Group className="d-flex gap-2 mt-2">
                                                <Form.Check id='dsa' />
                                                <Form.Label for='dsa'>DSA</Form.Label>
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <div className="builder-details_btn_div d-flex gap-2">
                                        <button className="builder-details_btn">Add</button>
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

export default EditQA;