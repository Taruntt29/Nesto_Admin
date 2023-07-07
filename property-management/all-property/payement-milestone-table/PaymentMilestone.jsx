import React, { useState } from 'react';
import { Button, Col, Table } from 'react-bootstrap';
import { GrFormAdd } from 'react-icons/gr';
// import { InputField } from '../../../../../components';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { regexValidation } from '../../../../../config/regex';
import InputField from '../../../../../components/form/InputField-2/InputField';

const PaymentMilestone = ({
  setPropertyFormData,
  paymentPlan,
  setFormValidationError,
}) => {
  const [paymentMilestoneForm, setPaymentMilestoneForm] = useState({
    payment: '',
    milestone: '',
  });
  const [isError, setIsError] = useState('');

  const handleSetFormValues = (name, value) =>
    setPaymentMilestoneForm(prevFormValues => ({
      ...prevFormValues,
      [name]: value,
    }));

  const handleAddRow = () => {
    if (
      paymentMilestoneForm.payment === '' &&
      paymentMilestoneForm.milestone === ''
    ) {
      setIsError('Payment plan field cannot be empty.');
      setFormValidationError('Please complete all fields and select an image.');
      return;
    }

    if (paymentMilestoneForm.payment && paymentMilestoneForm.milestone) {
      console.log('work');
      const newRow = {
        payment: paymentMilestoneForm.payment,
        milestone: paymentMilestoneForm.milestone,
      };
      if (Array.isArray(paymentPlan)) {
        setPropertyFormData(prevPropertyFormData => ({
          ...prevPropertyFormData,
          paymentPlan: [...paymentPlan, newRow],
        }));
      } else {
        setPropertyFormData(prevPropertyFormData => ({
          ...prevPropertyFormData,
          paymentPlan: [newRow],
        }));
      }
      setPaymentMilestoneForm({
        payment: '',
        milestone: '',
      });
      setIsError('');
      setFormValidationError('');
    }
  };

  const handleDeleteRow = index => {
    const newPaymentPlan = [...paymentPlan];
    newPaymentPlan.splice(index, 1);
    setPropertyFormData(newPaymentPlan);
  };

  return (
    <>
      <Col xs={12} className="d-flex gap-4">
        <div className="w-25">
          <InputField
            id="payment"
            label="Payment Plan (%)"
            type="text"
            placeholder="Payment %"
            value={paymentMilestoneForm.payment}
            name="payment"
            handleSetFormValues={handleSetFormValues}
            regexPattern={regexValidation.percentagePattern}
            validFeedback="Looks good!"
            invalidFeedback="Please enter a valid Value."
            className="input-background"
          />
        </div>
        <div className="flex-grow-1">
          <InputField
            id="milestone"
            label="Milestone"
            type="text"
            placeholder="milestone"
            value={paymentMilestoneForm.milestone}
            name="milestone"
            handleSetFormValues={handleSetFormValues}
            regexPattern={regexValidation.textPattern}
            validFeedback="Looks good!"
            invalidFeedback="Please enter a valid Value."
            className="input-background"
          />
        </div>
        <div className="d-flex justify-content-center align-items-center w-auto align-self-center ">
          <Button
            onClick={handleAddRow}
            className="custom-add-btn rounded-circle d-flex"
          >
            <GrFormAdd size={28} className="m-auto" />
          </Button>
        </div>
      </Col>
      {isError && (
        <Col xs={12}>
          <p className="text-danger">{isError}</p>
        </Col>
      )}
      {!!Array.isArray(paymentPlan) && paymentPlan.length > 0 && (
        <Col xs={12}>
          <Table bordered responsive>
            <thead>
              <tr>
                <th className="text-center w-25">Payment Plan</th>
                <th className="w-50">Milestone</th>
                <th className="text-center w-25">Action</th>
              </tr>
            </thead>
            <tbody>
              {paymentPlan?.map((row, index) => (
                <tr key={index}>
                  <td className="text-center">{row.payment}</td>
                  <td>{row.milestone}</td>
                  <td className="text-center">
                    <Button
                      variant="transparent"
                      className="p-0"
                      type="button"
                      onClick={() => handleEditRow(index)}
                    >
                      <FaRegEdit size={18} color="#000000" />
                    </Button>
                    <Button
                      variant="transparent"
                      type="button"
                      onClick={() => handleDeleteRow(index)}
                      className="p-0 ms-2"
                    >
                      <FaTrashAlt size={18} color="#EA000D" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      )}
    </>
  );
};

export default PaymentMilestone;
