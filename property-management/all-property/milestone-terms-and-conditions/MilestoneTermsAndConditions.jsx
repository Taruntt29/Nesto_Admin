import React, { useState } from 'react';
import { Button, Col, Form, Table } from 'react-bootstrap';
import { GrFormAdd } from 'react-icons/gr';
import { InputField } from '../../../../../components';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';

const MilestoneTermsAndConditions = ({
  handleInputChange,
  propertyBrokerageFormData,
  setPropertyBrokerageFormData,
  milestonesTermsConditions,
}) => {
  const [condition, setCondition] = useState('');
  const [brokerage, setBrokerage] = useState('');

  const handleAddRow = () => {
    if (condition && brokerage) {
      const newRow = { condition, brokerage };
      console.log(newRow);
      if (Array.isArray(milestonesTermsConditions)) {
        setPropertyBrokerageFormData(milestonesTermsConditionsFormData => ({
          ...milestonesTermsConditionsFormData,
          milestonesTermsConditions: [...milestonesTermsConditions, newRow],
        }));
      } else {
        setPropertyBrokerageFormData(milestonesTermsConditionsFormData => ({
          ...milestonesTermsConditionsFormData,
          milestonesTermsConditions: [newRow],
        }));
      }
      setCondition('');
      setBrokerage('');
    }
  };

  const handleDeleteRow = index => {
    const newMilestonesTermsConditions = [...milestonesTermsConditions];
    newMilestonesTermsConditions.splice(index, 1);
    setPropertyBrokerageFormData(newMilestonesTermsConditions);
  };

  return (
    <>
      <Col xs={12}>Milestone terms and conditions</Col>
      <Col xs={12} className="mt-3">
        <Form.Group>
          <Form.Label>Brokerage Type</Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              label="Percentage %"
              name="brokerageType"
              value="percentage"
              checked={propertyBrokerageFormData.brokerageType === 'percentage'}
              onChange={handleInputChange}
            />
            <Form.Check
              inline
              type="radio"
              label="Amount"
              name="brokerageType"
              value="amount"
              checked={propertyBrokerageFormData.brokerageType === 'amount'}
              onChange={handleInputChange}
            />
          </div>
        </Form.Group>
      </Col>
      <Col xs={12} className="d-flex gap-4">
        <div className="w-25">
          <InputField
            id="condition"
            label="Condition"
            type="text"
            placeholder="condition"
            value={condition}
            onChange={e => setCondition(e.target.value)}
            feedback="Please enter valid value"
            InputFieldClassName="input-background"
          />
        </div>
        <div className="flex-grow-1">
          <InputField
            id="brokerage"
            label="Brokerage"
            type="text"
            placeholder="brokerage"
            value={brokerage}
            onChange={e => setBrokerage(e.target.value)}
            // required
            feedback="Please enter valid milestone"
            InputFieldClassName="input-background"
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
      {!!Array.isArray(milestonesTermsConditions) &&
        milestonesTermsConditions.length > 0 && (
          <Col xs={12}>
            <Table bordered responsive>
              <thead>
                <tr>
                  <th className="text-center w-25">Condition</th>
                  <th className="w-50">Brokerage</th>
                  <th className="text-center w-25">Action</th>
                </tr>
              </thead>
              <tbody>
                {milestonesTermsConditions?.map((row, index) => (
                  <tr key={index}>
                    <td className="text-center">{row.condition}</td>
                    <td>{row.brokerage}</td>
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

export default MilestoneTermsAndConditions;
