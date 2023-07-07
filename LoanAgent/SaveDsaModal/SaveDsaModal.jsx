import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import './SaveDsaModal.css'

function SaveDsaModal({ show, onHide }) {


    return (
        <>
            <Modal
                show={show}

                dialogClassName="modal-md"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header>
                    {" "}
                    <div>
                        <h4 className="save-dsa_heading">Are you sure you want to save the information?</h4>
                    </div>{" "}
                </Modal.Header>
                <Modal.Body>
                    <div className="col-12">
                        <div className="row">
                            <div className='save-dsa_btn_div gap-4'>
                                <button className='save-dsa_btn' onClick={() => onHide()}>No</button>
                                <button className='save-dsa_btn'>Yes</button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SaveDsaModal;