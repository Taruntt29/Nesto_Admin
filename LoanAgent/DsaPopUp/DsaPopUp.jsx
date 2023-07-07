import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './DsaPopUp.css'

const DsaPopUp = (props) => {
    const data = [
        {
            labelName: 'DSA  Name',
            inputType: 'text',
            labelFor: 'subCm-input',
            inputPlaceholder: 'Enter DSA name',
        },
        {
            labelName: 'Phone Number',
            inputType: 'text',
            labelFor: 'repre-input',
            inputPlaceholder: 'Enter phone number',
        },
        {
            labelName: 'Email',
            inputType: 'tel',
            labelFor: 'contact-input',
            inputPlaceholder: 'Enter Email',
        },
        {
            labelName: 'Area of Operations',
            inputType: 'email',
            labelFor: 'email-input',
            inputPlaceholder: 'Enter area of operations',
        },
        {
            labelName: 'Bank Associations',
            inputType: 'number',
            labelFor: 'gst-input',
            inputPlaceholder: 'Choose bank associations',
        },
        {
            labelName: 'Loan Range',
            inputType: 'text',
            labelFor: 'pan-input',
            inputPlaceholder: 'Choose range',
        },
    ]
    return (
        <>
            <Modal
                {...props}
                size='lg' animation={true}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton className='builder-details_modal'>
                    <Modal.Title className=''>
                        <span className='builder-details_modal_heading'>Ann Culhane</span>
                        <span className='builder-details_modal_sub_nmbr'>5684236526</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        {data.map((item) => {
                            return (
                                <div className='col-lg-6 builder-details_modal-col'>
                                    <label className='builder-details_modal_label' for={item.labelFor}>{item.labelName}</label>
                                    <input type='text' placeholder={item.inputPlaceholder} id={item.labelFor} className='builder-details_modal_input' />
                                </div>
                            )
                        })}
                        <div className='builder-details_btn_div d-flex gap-2'>
                            <button className='builder-details_btn'>Next</button>
                            <button className='builder-details_btn'>Reset</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DsaPopUp