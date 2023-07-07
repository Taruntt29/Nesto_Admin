import React, { useEffect, useState } from 'react';
import FormData from 'form-data';
import {
  Form,
  Row,
  Col,
  Container,
  InputGroup,
  Image,
  Table,
  Button,
} from 'react-bootstrap';
import {
  CustomButton,
  ErrorMessage,
  InputField,
  LoadingSpinner,
} from '../../../../components';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { useGetQuery, usePutMutation } from '../../../../hooks/tanstackQuery';

import FileUpload from '../../../../components/file-upload/FileUpload';
import FileUploader from '../../../../components/file-uploader/FileUploader';
import { apiEndpoints } from '../../../../config/apiEndpoints';
import CustomCreatableSelect from '../../../../components/creatable-select/CustomCreatableSelect';
import { useSelector } from 'react-redux';

const AddPropertyFloorPlan = ({
  mainId,
  setAddPropertySteps,
  propertyTypeCategory,
}) => {
  const propertyTypeString = useSelector(
    state => state.property.propertyTypeString
  );
  console.log(propertyTypeString);
  const [files, setFiles] = useState([]);
  const [floorPlanFormData, setFloorPlanFormData] = useState({
    mainId,
    unitType: '',
    carpetSize: '',
    plotSize: [{ length: '', breadth: '' }],
    // furnishingStatus: '',
    price: '',
    // quantity: '',
    onesqft: '',
    constructionStatus: '',
    possessionDate: '',
  });

  const { mutate, isLoading, isSuccess, isError, error, data } = usePutMutation(
    apiEndpoints.addFloorPlanAndPricing,
    'getAllproperty'
  );

  const checkExactMatch = (inputString, searchString) => {
    const pattern = new RegExp(`\\b${searchString}\\b`, 'i');
    return pattern.test(inputString);
  };

  const handleInputChange = e => {
    const {
      name,
      value,
      dataset: { inputField },
    } = e.target;

    if (name === 'plotSize') {
      const plotSize = [{ ...floorPlanFormData[name][0], [inputField]: value }];
      setFloorPlanFormData(prevFloorPlanFormData => ({
        ...prevFloorPlanFormData,
        [name]: plotSize,
      }));
    } else {
      setFloorPlanFormData(prevFloorPlanFormData => ({
        ...prevFloorPlanFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(floorPlanFormData);
    // return;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('floorPlanImage', files[i]);
    }

    Object.entries(floorPlanFormData).forEach(([key, value]) => {
      formData.append(
        key,
        Array.isArray(value) ? JSON.stringify(value) : value
      );
    });

    console.log(Array.from(formData));
    // return;
    mutate(formData);
  };

  const {
    isLoading: isGetAllSpecificationLoading,
    isError: isGetAllSpecificationIsError,
    data: getAllSpecificationData,
    isSuccess: isGetAllSpecificationSuccess,
  } = useGetQuery('getAllSpecification', apiEndpoints.getAllSpecification);
  const {
    isLoading: isGetAllFurnishingDetailLoading,
    isError: isGetAllFurnishingDetailIsError,
    data: getAllFurnishingDetailData,
    isSuccess: isGetAllFurnishingDetailSuccess,
  } = useGetQuery(
    'getAllFurnishingDetail',
    apiEndpoints.getAllFurnishingDetail
  );

  if (isGetAllSpecificationLoading && isGetAllFurnishingDetailLoading) {
    return <LoadingSpinner />;
  }

  if (isGetAllSpecificationIsError && isGetAllFurnishingDetailIsError) {
    return <ErrorMessage />;
  }

  if (isGetAllFurnishingDetailSuccess && isGetAllSpecificationSuccess) {
    console.log(propertyTypeString);
  }

  return (
    <>
      <h1>{propertyTypeString}</h1>
      <Form onSubmit={handleSubmit}>
        <Container className="NESTO__admin__main__add__property">
          <Row>
            <Col xs={12}>
              <Row className="gy-4">
                <Col xs={12}>
                  <div className="grid-container">
                    <div>
                      <h1 className="file-upload-title">Upload Floor Plan</h1>

                      <FileUploader
                        files={files}
                        setFiles={setFiles}
                        multiple={false}
                      />
                    </div>
                  </div>
                </Col>
                <Col xs={12}>
                  <hr className="custom-divider" />
                </Col>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Choose Unit Type</Form.Label>
                    <Form.Select
                      value={floorPlanFormData.unitType}
                      name="unitType"
                      onChange={handleInputChange}
                      className="input-background form-select-lg"
                    >
                      <option value="" disabled selected>
                        Select Unit Type
                      </option>
                      <option value="2bhk">2 BHK</option>
                      <option value="3bhk">3 BHK</option>
                      <option value="4bhk">4 BHK</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Construction Status</Form.Label>
                    <Form.Control
                      size="lg"
                      as="select"
                      placeholder="Construction Status"
                      value={floorPlanFormData.constructionStatus}
                      onChange={handleInputChange}
                      className="input-background"
                      name="constructionStatus"
                    >
                      <option value="" disabled selected>
                        Choose construction status
                      </option>
                      <option value="New Launch">New Launch</option>
                      <option value="Under Construction">
                        Under Construction
                      </option>
                      <option value="Ready To Move">Ready To Move</option>
                      <option value="Possession Soon">Possession Soon</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group controlId="dateInput" className="mb-4">
                    <Form.Label>Possession Date</Form.Label>
                    <Form.Control
                      disabled={
                        floorPlanFormData.constructionStatus === 'Ready To Move'
                      }
                      type="date"
                      name="possessionDate"
                      value={floorPlanFormData.possessionDate}
                      onChange={handleInputChange}
                      placeholder="Enter Posession Date"
                      className="input-background
                        "
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <InputField
                    label="Price"
                    type="text"
                    placeholder="Price"
                    value={floorPlanFormData.price}
                    inputName="price"
                    onChange={handleInputChange}
                    InputFieldClassName="input-background"
                  />
                </Col>
                {/* low high rise  farmhouse villa*/}
                {checkExactMatch(
                  'low rise high rise builder floor house duplex farmhouse villa',
                  propertyTypeString
                ) ? (
                  <>
                    <Col xs={6}>
                      <Form.Group>
                        <Form.Label>Carpet Size</Form.Label>
                        <InputField
                          type="text"
                          placeholder="Carpet size"
                          value={floorPlanFormData.carpetSize}
                          inputName="carpetSize"
                          onChange={handleInputChange}
                          InputFieldClassName="input-background"
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={6}>
                      <CustomCreatableSelect
                        customCreatableSelectName="customCreatableSelectName"
                        label="Furnishing Details"
                        placeholder="Furnishing Details"
                        type="furnishing"
                        data={getAllFurnishingDetailData}
                        name="furnishingDetails"
                        setPropertyFormData={setFloorPlanFormData}
                      />
                    </Col>
                  </>
                ) : null}
                {/* low high rise code end here farmhouse villa*/}
                {checkExactMatch(
                  'builder floor house duplex farmhouse villa',
                  propertyTypeString
                ) && (
                  <Col xs={6}>
                    <InputGroup className="gap-3 w-100">
                      <Form.Group>
                        <Form.Label>Plot Size</Form.Label>
                        <InputField
                          type="text"
                          placeholder="Length"
                          value={floorPlanFormData.plotSize[0].length}
                          inputName="plotSize"
                          inputFieldData="length"
                          onChange={handleInputChange}
                          InputFieldClassName="input-background"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="invisible">Plot Size</Form.Label>
                        <InputField
                          type="text"
                          placeholder="Breath"
                          value={floorPlanFormData.plotSize[0].breadth}
                          inputName="plotSize"
                          inputFieldData="breadth"
                          onChange={handleInputChange}
                          InputFieldClassName="input-background"
                        />
                      </Form.Group>
                    </InputGroup>
                  </Col>
                )}
                {/* builder floor house duplex farmhouse villa code end here */}
                {/* plot and land sco show cum office  */}
                {checkExactMatch(
                  'plots / lands sco commercial space',
                  propertyTypeString
                ) ? (
                  <>
                    <Col xs={6}>
                      <Row className="g-3">
                        <Col xs={6}>
                          <Form.Group>
                            <Form.Label>
                              {propertyTypeString === 'sco' ||
                              propertyTypeString === 'commercial space'
                                ? 'Carpet Size'
                                : 'Plot Size'}
                            </Form.Label>
                            <InputField
                              type="text"
                              placeholder="Length"
                              value={floorPlanFormData.plotSize[0].length}
                              inputName="plotSize"
                              inputFieldData="length"
                              onChange={handleInputChange}
                              InputFieldClassName="input-background"
                            />
                          </Form.Group>
                        </Col>
                        <Col xs={6}>
                          {' '}
                          <Form.Group>
                            <Form.Label className="invisible">
                              Plot Size
                            </Form.Label>
                            <InputField
                              type="text"
                              placeholder="Breath"
                              value={floorPlanFormData.plotSize[0].breadth}
                              inputName="plotSize"
                              inputFieldData="breadth"
                              onChange={handleInputChange}
                              InputFieldClassName="input-background"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={6}>
                      <CustomCreatableSelect
                        customCreatableSelectName="customCreatableSelectName"
                        label="Furnishing Details"
                        placeholder="Furnishing Details"
                        type="furnishing"
                        data={getAllFurnishingDetailData}
                        name="furnishingDetails"
                        setPropertyFormData={setFloorPlanFormData}
                      />
                    </Col>
                  </>
                ) : null}
                {/* plot and land code end here sco show cum office code end here*/}
                {checkExactMatch('warehouse', propertyTypeString) && (
                  <>
                    <Col xs={6}>
                      <InputField
                        label="Sq.Ft."
                        type="text"
                        placeholder="Sq.Ft."
                        value={floorPlanFormData.onesqft}
                        inputName="onesqft"
                        onChange={handleInputChange}
                        InputFieldClassName="input-background"
                      />
                    </Col>
                    <Col xs={6}>
                      <InputField
                        label="Price"
                        type="text"
                        placeholder="Price"
                        value={floorPlanFormData.price}
                        inputName="price"
                        onChange={handleInputChange}
                        InputFieldClassName="input-background"
                      />
                    </Col>
                    <Col xs={6}>
                      <Form.Group>
                        <Form.Label>Construction Status</Form.Label>
                        <Form.Control
                          size="lg"
                          as="select"
                          placeholder="Construction Status"
                          value={floorPlanFormData.constructionStatus}
                          onChange={handleInputChange}
                          className="input-background"
                          name="constructionStatus"
                        >
                          <option value="" disabled selected>
                            Choose construction status
                          </option>
                          <option value="New Launch">New Launch</option>
                          <option value="Under Construction">
                            Under Construction
                          </option>
                          <option value="Ready To Move">Ready To Move</option>
                          <option value="Possession Soon">
                            Possession Soon
                          </option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <Form.Group controlId="dateInput" className="mb-4">
                        <Form.Label>Possession Date</Form.Label>
                        <Form.Control
                          disabled={
                            floorPlanFormData.constructionStatus ===
                            'Ready To Move'
                          }
                          type="date"
                          name="possessionDate"
                          value={floorPlanFormData.possessionDate}
                          onChange={handleInputChange}
                          placeholder="Enter Posession Date"
                          className="input-background
                        "
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <CustomCreatableSelect
                        customCreatableSelectName="customCreatableSelectName"
                        label="Furnishing Details"
                        placeholder="Furnishing Details"
                        type="furnishing"
                        data={getAllFurnishingDetailData}
                        name="furnishingDetails"
                        setPropertyFormData={setFloorPlanFormData}
                      />
                    </Col>
                  </>
                )}
                {checkExactMatch('shop', propertyTypeString) && (
                  <>
                    <Col xs={6}>
                      <InputGroup className="gap-3 w-100">
                        <Form.Group>
                          <Form.Label>Plot Size</Form.Label>
                          <InputField
                            type="text"
                            placeholder="Length"
                            value={floorPlanFormData.plotSize[0].length}
                            inputName="plotSize"
                            inputFieldData="length"
                            onChange={handleInputChange}
                            InputFieldClassName="input-background"
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label className="invisible">
                            Plot Size
                          </Form.Label>
                          <InputField
                            type="text"
                            placeholder="Breath"
                            value={floorPlanFormData.plotSize[0].breadth}
                            inputName="plotSize"
                            inputFieldData="breadth"
                            onChange={handleInputChange}
                            InputFieldClassName="input-background"
                          />
                        </Form.Group>
                      </InputGroup>
                    </Col>
                    <Col xs={6}>
                      <InputField
                        label="Price"
                        type="text"
                        placeholder="Price"
                        value={floorPlanFormData.price}
                        inputName="price"
                        onChange={handleInputChange}
                        InputFieldClassName="input-background"
                      />
                    </Col>
                    <Col xs={6}>
                      <Form.Group>
                        <Form.Label>Construction Status</Form.Label>
                        <Form.Control
                          size="lg"
                          as="select"
                          placeholder="Construction Status"
                          value={floorPlanFormData.constructionStatus}
                          onChange={handleInputChange}
                          className="input-background"
                          name="constructionStatus"
                        >
                          <option value="" disabled selected>
                            Choose construction status
                          </option>
                          <option value="New Launch">New Launch</option>
                          <option value="Under Construction">
                            Under Construction
                          </option>
                          <option value="Ready To Move">Ready To Move</option>
                          <option value="Possession Soon">
                            Possession Soon
                          </option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <Form.Group controlId="dateInput" className="mb-4">
                        <Form.Label>Possession Date</Form.Label>
                        <Form.Control
                          disabled={
                            floorPlanFormData.constructionStatus ===
                            'Ready To Move'
                          }
                          type="date"
                          name="possessionDate"
                          value={floorPlanFormData.possessionDate}
                          onChange={handleInputChange}
                          placeholder="Enter Posession Date"
                          className="input-background
                        "
                        />
                      </Form.Group>
                    </Col>
                  </>
                )}

                <Col xs={6}>
                  <CustomCreatableSelect
                    customCreatableSelectName="customCreatableSelectName"
                    label="Specification"
                    placeholder="Specification"
                    type="specification"
                    data={getAllSpecificationData}
                    name="specifications"
                    setPropertyFormData={setFloorPlanFormData}
                  />
                </Col>

                <Col xs={12} className="d-flex justify-content-end gap-3 mt-5">
                  <CustomButton
                    isDisabled={isLoading}
                    customButtonClass="custom-button-primary rounded-2 px-5"
                  >
                    {isError && <ErrorMessage />}
                    {isLoading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      'Add'
                    )}
                  </CustomButton>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Form>
      <Table className="mt-5 d-none" bordered responsive>
        <thead>
          <tr>
            <th className="text-center">Photo</th>
            <th>Unit Type</th>
            <th>Carpet Size</th>
            <th>Furnishing</th>
            <th>Price</th>
            <th>Specification</th>
            <th>Quantity</th>
            <th className="text-center w-25">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">
              <Image src="" alt="floor img" />
            </td>
            <td>2 BHK</td>
            <td>Lorem Ipsum</td>
            <td>Lorem Ipsum</td>
            <td>Lorem Ipsum</td>
            <td>Lorem Ipsum</td>
            <td>Lorem Ipsum</td>
            <td className="text-center">
              <Button
                variant="transparent"
                className="p-0"
                type="button"
                // onClick={() => handleEditRow(index)}
              >
                <FaRegEdit size={18} color="#000000" />
              </Button>
              <Button
                variant="transparent"
                type="button"
                // onClick={() => handleDeleteRow(index)}
                className="p-0 ms-2"
              >
                <FaTrashAlt size={18} color="#EA000D" />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      <Row>
        {isSuccess && (
          <Col xs={12} className="d-flex justify-content-end gap-3 mt-5">
            <CustomButton
              handleAdd={() =>
                setAddPropertySteps(prevAddPropertySteps => ({
                  ...prevAddPropertySteps,
                  addNewProperty: true,
                  addFloorPlan: true,
                }))
              }
              customButtonClass="custom-button-primary rounded-2 px-5"
            >
              Save & Continue
            </CustomButton>
          </Col>
        )}
      </Row>
    </>
  );
};

export default AddPropertyFloorPlan;
