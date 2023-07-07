import React, { useState } from 'react';
import { Button, Col, InputGroup, Row, Table } from 'react-bootstrap';
import { GrFormAdd } from 'react-icons/gr';

import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import './Price.css';
import { regexValidation } from '../../../../../config/regex';
import InputField from '../../../../../components/form/InputField-2/InputField';
const CurrentlyComparingPrice = ({
  setPropertyFormData,
  currentlyComparing,
  setFormValidationError,
}) => {
  const [price, setPrice] = useState({
    withLocality: '',
    currentPrice: '',
    last1Year: '',
    last2Year: '',
    last3Year: '',
    last4Year: '',
  });
  const [isError, setIsError] = useState('');

  const handleAddRow = () => {
    if (
      price.withLocality === '' &&
      price.currentPrice === '' &&
      price.last1Year === '' &&
      price.last2Year === '' &&
      price.last3Year === '' &&
      price.last4Year === ''
    ) {
      setIsError('Price Trend field cannot be empty.');
      setFormValidationError('Please complete all fields and select an image.');
      return;
    }
    if (
      price.withLocality &&
      price.currentPrice &&
      price.last1Year &&
      price.last2Year &&
      price.last3Year &&
      price.last4Year
    ) {
      const newRow = { ...price };

      if (Array.isArray(currentlyComparing)) {
        setPropertyFormData(prevPropertyFormData => ({
          ...prevPropertyFormData,
          currentlyComparing: [...currentlyComparing, newRow],
        }));
      } else {
        setPropertyFormData(prevPropertyFormData => ({
          ...prevPropertyFormData,
          currentlyComparing: [newRow],
        }));
      }

      setPrice({
        withLocality: '',
        currentPrice: '',
        last1Year: '',
        last2Year: '',
        last3Year: '',
        last4Year: '',
      });
      setIsError('');
      setFormValidationError('');
    }
  };

  const handleSetFormValues = (name, value) =>
    setPrice(prevFormValues => ({
      ...prevFormValues,
      [name]: value,
    }));

  return (
    <>
      <Row className="gy-3">
        <Col xs={10}>
          <Row>
            <Col xs={12}>
              <h6 className="fw-semibold mt-2 mb-3">Price Trend</h6>
            </Col>
            <Col xs={4}>
              <InputField
                id="withLocality"
                label="Locality"
                type="text"
                placeholder="Locality"
                value={price.withLocality}
                name="withLocality"
                handleSetFormValues={handleSetFormValues}
                regexPattern={regexValidation.addressLocationPattern}
                validFeedback="Looks good!"
                invalidFeedback="Please enter a valid Value."
                className="input-background"
              />
            </Col>
            <Col xs={4}>
              {' '}
              <InputField
                id="currentPrice"
                label="Current Price"
                type="text"
                placeholder="Current Price"
                value={price.currentPrice}
                name="currentPrice"
                handleSetFormValues={handleSetFormValues}
                regexPattern={regexValidation.numericPattern}
                validFeedback="Looks good!"
                invalidFeedback="Please enter a valid Value."
                className="input-background"
              />
            </Col>
            <Col xs={4}>
              {' '}
              <InputField
                id="last1Year"
                label="Price for Last 1 Year"
                type="text"
                placeholder="Price for Last 1 Year"
                value={price.last1Year}
                name="last1Year"
                handleSetFormValues={handleSetFormValues}
                regexPattern={regexValidation.numericPattern}
                validFeedback="Looks good!"
                invalidFeedback="Please enter a valid Value."
                className="input-background"
              />
            </Col>
          </Row>
        </Col>

        <Col xs={2}></Col>
      </Row>
      <Row className="gy-3">
        <Col xs={10}>
          <Row>
            <Col xs={4}>
              {' '}
              <InputField
                id="last2Year"
                label="Price for Last 2 Year"
                type="text"
                placeholder="Price for Last 2 Year"
                value={price?.last2Year}
                name="last2Year"
                handleSetFormValues={handleSetFormValues}
                regexPattern={regexValidation.numericPattern}
                validFeedback="Looks good!"
                invalidFeedback="Please enter a valid Value."
                className="input-background"
              />
            </Col>
            <Col xs={4}>
              {' '}
              <InputField
                id="last3Year"
                label="Price for Last 3 Year"
                type="text"
                placeholder="Price for Last 3 Year"
                value={price?.last3Year}
                name="last3Year"
                handleSetFormValues={handleSetFormValues}
                regexPattern={regexValidation.numericPattern}
                validFeedback="Looks good!"
                invalidFeedback="Please enter a valid Value."
                className="input-background"
              />
            </Col>
            <Col xs={4}>
              {' '}
              <InputField
                id="last4Year"
                label="Price for Last 4 Year"
                type="text"
                placeholder="Price for Last 4 Year"
                value={price?.last4Year}
                name="last4Year"
                handleSetFormValues={handleSetFormValues}
                regexPattern={regexValidation.numericPattern}
                validFeedback="Looks good!"
                invalidFeedback="Please enter a valid Value."
                className="input-background"
              />
            </Col>
          </Row>
        </Col>
        <Col xs={2}>
          {' '}
          <Button
            onClick={handleAddRow}
            className="custom-add-btn rounded-circle d-flex"
          >
            <GrFormAdd size={28} className="m-auto" />
          </Button>
        </Col>
      </Row>
      {isError && (
        <Col xs={12}>
          <p className="text-danger">{isError}</p>
        </Col>
      )}

      {!!Array.isArray(currentlyComparing) && currentlyComparing.length > 0 && (
        <Col xs={12}>
          <Table bordered responsive className="mt-4">
            <thead>
              <tr>
                <th className="text-center">Locality</th>
                <th className="text-center">Current Price</th>
                <th className="text-center">Last 1 Year</th>
                <th className="text-center">Last 2 Year</th>
                <th className="text-center">Last 3 Year</th>
                <th className="text-center">Last 4 Year</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentlyComparing?.map((row, index) => (
                <tr key={index}>
                  <td className="text-center">{row.withLocality}</td>
                  <td className="text-center">{row.currentPrice}</td>
                  <td className="text-center">{row.last1Year}</td>
                  <td className="text-center">{row.last2Year}</td>
                  <td className="text-center">{row.last3Year}</td>
                  <td className="text-center">{row.last4Year}</td>

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

export default CurrentlyComparingPrice;
