import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Image,
  Row,
  Table,
  Form,
} from 'react-bootstrap';
import FormData from 'form-data';
import { useDispatch, useSelector } from 'react-redux';
import {
  useDeleteMutation,
  useGetQuery,
  useGetQueryWithId,
  usePostMutation,
  usePutMutation,
} from '../../../../hooks/tanstackQuery';
import { apiEndpoints } from '../../../../config/apiEndpoints';
import {
  CustomButton,
  ErrorMessage,
  InputField,
  LoadingSpinner,
} from '../../../../components';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import FileUploader from '../../../../components/file-uploader/FileUploader';
import FileUpload from '../../../../components/file-upload/FileUpload';
import { setBuilderOnBoardingStep } from '../../../../store/store';

const AddBuilderPastProperty = () => {
  const builderId = useSelector(state => state.builder.builderId);
  const dispatch = useDispatch();

  const [files, setFiles] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState();
  const [builderPastPropertyFormData, setBuilderPastPropertyFormData] =
    useState({
      propertyName: '',
      location: '',
      price: '',
      propertyType: '',
    });

  const {
    mutate: addPastProperty,
    isLoading: isAddPastPropertyLoading,
    isError: isAddPastPropertyIsError,
    data: addPastPropertyData,
    isSuccess: isAddPastPropertySuccess,
  } = usePostMutation(
    apiEndpoints.addbuilderPastProperty,
    'getbuilderPastProperty'
  );

  const {
    isLoading: isGetbuilderPastPropertyLoading,
    isError: isGetbuilderPastPropertyIsError,
    data: getbuilderPastPropertyData,
    isSuccess: isGetbuilderPastPropertySuccess,
  } = useGetQueryWithId(
    'getbuilderPastProperty',
    apiEndpoints.getbuilderPastProperty,
    builderId,
    'builderId'
  );
  const {
    isLoading: isGetbuilderPastPropertyByIdLoading,
    isError: isGetbuilderPastPropertyByIdIsError,
    data: getbuilderPastPropertyByIdData,
    isSuccess: isGetbuilderPastPropertyByIdSuccess,
  } = useGetQueryWithId(
    'getbuilderPastPropertyById',
    apiEndpoints.getbuilderPastPropertyById,
    id
  );

  const {
    mutate: updatebuilderPastProperty,
    isLoading: isUpdatebuilderPastPropertyLoading,
    isError: isUpdatebuilderPastPropertyIsError,
    data: updatebuilderPastPropertyData,
    isSuccess: isUpdatebuilderPastPropertySuccess,
  } = usePutMutation(
    apiEndpoints.updatebuilderPastProperty,
    'getbuilderPastProperty'
  );

  const {
    mutate: deletebuilderPastPropertyById,
    isLoading: isDeletebuilderPastPropertyByIdLoading,
    isError: isDeletebuilderPastPropertyByIdIsError,
    data: deletebuilderPastPropertyByIdData,
    isSuccess: isDeletebuilderPastPropertyByIdSuccess,
  } = useDeleteMutation(
    apiEndpoints.deletebuilderPastProperty,
    'getbuilderPastProperty'
  );

  const {
    isLoading: isGetAllPropertyCategoryLoading,
    isError: isGetAllPropertyCategoryIsError,
    data: getAllPropertyCategoryData,
    isSuccess: isGetAllPropertyCategorySuccess,
    refetch: getAllPropertyCategoryRefetch,
  } = useGetQuery(
    'getAllPropertyCategory',
    apiEndpoints.getAllPropertyCategory
  );

  const handleInputChange = e => {
    const { name, value } = e.target;
    console.log(name, value);
    setBuilderPastPropertyFormData({
      ...builderPastPropertyFormData,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(builderPastPropertyFormData);

    const formData = new FormData();

    Object.entries(builderPastPropertyFormData).forEach(([key, value]) => {
      formData.append(
        key,
        Array.isArray(value) ? JSON.stringify(value) : value
      );
    });

    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }

    formData.append('builderId', builderId);

    if (isEditMode) {
      formData.append('id', id);
    }

    if (isEditMode) {
      console.log(Array.from(formData));
      updatebuilderPastProperty(formData);
    } else {
      console.log(Array.from(formData));

      addPastProperty(formData);
      setBuilderPastPropertyFormData(
        Object.keys(builderPastPropertyFormData).reduce(
          (acc, key) => ({ ...acc, [key]: '' }),
          {}
        )
      );
      setFiles([]);
    }
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setId(null);
    setBuilderPastPropertyFormData(
      Object.keys(builderPastPropertyFormData).reduce(
        (acc, key) => ({ ...acc, [key]: '' }),
        {}
      )
    );
    setFiles([]);
  };

  const handleEdit = id => {
    setId(id);
    setIsEditMode(true);
  };

  const handleDelete = id => {
    deletebuilderPastPropertyById(id);
    setIsEditMode(false);
    setId(null);
    setBuilderPastPropertyFormData(
      Object.keys(builderPastPropertyFormData).reduce(
        (acc, key) => ({ ...acc, [key]: '' }),
        {}
      )
    );
    setFiles([]);
  };

  useEffect(() => {
    if (isGetbuilderPastPropertyByIdSuccess && getbuilderPastPropertyByIdData) {
      setBuilderPastPropertyFormData({
        propertyName: getbuilderPastPropertyByIdData[0].propertyName,
        location: getbuilderPastPropertyByIdData[0].location,
        price: getbuilderPastPropertyByIdData[0].price,
        propertyType: getbuilderPastPropertyByIdData[0].propertyType,
      });
    }
  }, [isGetbuilderPastPropertyByIdSuccess, getbuilderPastPropertyByIdData]);

  if (isGetAllPropertyCategoryLoading) {
    return <LoadingSpinner />;
  }

  if (isGetAllPropertyCategoryIsError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Container className="NESTO__admin__main__add__property__section NESTO__admin__main__add__property__form m-3 px-4 py-2 pb-5">
          <Row>
            {isEditMode && isGetbuilderPastPropertyByIdSuccess && (
              <FileUploader
                files={files}
                setFiles={setFiles}
                multiple={true}
                existingFiles={getbuilderPastPropertyByIdData[0]?.imageUrl}
              />
            )}

            {!isEditMode && (
              <Col xs={12}>
                <FileUploader
                  files={files}
                  setFiles={setFiles}
                  multiple={true}
                />
              </Col>
            )}
            <Col xs={12}>
              <hr className="custom-divider" />
            </Col>
            {!isEditMode && (
              <Col xs={12}>
                <Row className="gy-4">
                  <Col xs={6}>
                    <InputField
                      label="Property Name"
                      type="text"
                      placeholder="Property Name"
                      value={
                        isGetbuilderPastPropertySuccess && id
                          ? getbuilderPastPropertyByIdData[0]?.propertyName
                          : builderPastPropertyFormData.propertyName
                      }
                      inputName="propertyName"
                      onChange={handleInputChange}
                      InputFieldClassName="input-background"
                    />
                  </Col>
                  <Col xs={6}>
                    <InputField
                      label="Location"
                      type="text"
                      placeholder="Location"
                      value={
                        isGetbuilderPastPropertySuccess && id
                          ? getbuilderPastPropertyByIdData[0]?.location
                          : builderPastPropertyFormData.location
                      }
                      inputName="location"
                      onChange={handleInputChange}
                      InputFieldClassName="input-background"
                    />
                  </Col>
                  <Col xs={6}>
                    <InputField
                      label="Price"
                      type="text"
                      placeholder="Price"
                      value={
                        isGetbuilderPastPropertySuccess && id
                          ? getbuilderPastPropertyByIdData[0]?.price
                          : builderPastPropertyFormData.price
                      }
                      inputName="price"
                      onChange={handleInputChange}
                      InputFieldClassName="input-background"
                    />
                  </Col>

                  <Col xs={6}>
                    <Form.Group>
                      <Form.Label>Property Type</Form.Label>
                      <Form.Select
                        value={
                          isGetbuilderPastPropertySuccess && id
                            ? getbuilderPastPropertyByIdData[0]?.propertyType
                            : builderPastPropertyFormData.propertyType
                        }
                        // inputName="propertyType"
                        name="propertyType"
                        onChange={handleInputChange}
                        className="input-background form-select-lg"
                      >
                        <option value="" disabled selected>
                          Select
                        </option>
                        {getAllPropertyCategoryData?.map(({ name, _id }) => (
                          <>
                            <option value={name} key={_id}>
                              {name}
                            </option>
                          </>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            )}
            {isEditMode && isGetbuilderPastPropertyByIdIsError && (
              <Col xs={12}>
                <ErrorMessage />
              </Col>
            )}

            {isEditMode && isGetbuilderPastPropertyByIdLoading && (
              <Col xs={12}>
                <LoadingSpinner />
              </Col>
            )}
            {isEditMode && isGetbuilderPastPropertyByIdSuccess && (
              <Col xs={12}>
                <Row className="gy-4">
                  <Col xs={6}>
                    <InputField
                      label="Property Name"
                      type="text"
                      placeholder="Property Name"
                      value={builderPastPropertyFormData.propertyName}
                      inputName="propertyName"
                      onChange={handleInputChange}
                      InputFieldClassName="input-background"
                    />
                  </Col>

                  <Col xs={6}>
                    <InputField
                      label="Location"
                      type="text"
                      placeholder="Location"
                      value={builderPastPropertyFormData.location}
                      inputName="location"
                      onChange={handleInputChange}
                      InputFieldClassName="input-background"
                    />
                  </Col>
                  <Col xs={6}>
                    <InputField
                      label="Price"
                      type="text"
                      placeholder="Price"
                      value={builderPastPropertyFormData.price}
                      inputName="price"
                      onChange={handleInputChange}
                      InputFieldClassName="input-background"
                    />
                  </Col>

                  <Col xs={6}>
                    <Form.Group>
                      <Form.Label>Property Type</Form.Label>
                      <Form.Select
                        value={builderPastPropertyFormData.propertyType}
                        name="propertyType"
                        onChange={handleInputChange}
                        className="input-background form-select-lg"
                      >
                        <option value="" disabled selected>
                          Select
                        </option>
                        {getAllPropertyCategoryData?.map(({ name, _id }) => (
                          <>
                            <option value={name} key={_id}>
                              {name}
                            </option>
                          </>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            )}
            {isGetbuilderPastPropertyLoading && <LoadingSpinner />}
            {isGetbuilderPastPropertyIsError && <ErrorMessage />}
            {isGetbuilderPastPropertySuccess && (
              <Col xs={12}>
                <Table className="mt-3" bordered responsive>
                  <thead>
                    <tr>
                      <th className="text-center">Name</th>
                      <th className="text-center">Location</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Property Type</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getbuilderPastPropertyData?.map(pastProperty => (
                      <>
                        {!pastProperty?.isDeleted && (
                          <tr key={pastProperty?._id}>
                            <td className="text-center">
                              {pastProperty?.propertyName}
                            </td>
                            <td className="text-center">
                              {pastProperty?.location}
                            </td>
                            <td className="text-center">
                              {pastProperty?.price}
                            </td>
                            <td className="text-center">
                              {pastProperty.propertyType}
                            </td>
                            <td className="text-center">
                              <Button
                                variant="transparent"
                                className="p-0"
                                type="button"
                                onClick={() => handleEdit(pastProperty?._id)}
                              >
                                <FaRegEdit size={18} color="#000000" />
                              </Button>
                              <Button
                                variant="transparent"
                                type="button"
                                className="p-0 ms-2"
                                onClick={() => handleDelete(pastProperty?._id)}
                              >
                                <FaTrashAlt size={18} color="#EA000D" />
                              </Button>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                  {!getbuilderPastPropertyData?.filter(
                    pastProperty => !pastProperty?.isDeleted
                  ).length && (
                    <tfoot>
                      <tr className="no-data-row text-center">
                        <td colspan="4">No data to display</td>
                      </tr>
                    </tfoot>
                  )}
                </Table>
              </Col>
            )}

            {!isEditMode && (
              <Col xs={12} className="mt-5 d-flex justify-content-end gap-3">
                <CustomButton
                  isDisabled={isAddPastPropertyLoading}
                  customButtonClass="custom-button-primary rounded-2 px-5 py-2"
                >
                  {!isGetbuilderPastPropertyByIdSuccess &&
                  isAddPastPropertyLoading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    'Add'
                  )}
                  {isGetbuilderPastPropertyByIdSuccess && 'Update'}
                </CustomButton>
                <CustomButton
                  handleAdd={() => dispatch(setBuilderOnBoardingStep(false))}
                  customButtonClass="custom-button-primary rounded-2 px-5"
                >
                  Save & Exit
                </CustomButton>
              </Col>
            )}

            {isEditMode && (
              <Col
                xs={12}
                className="d-flex justify-content-end align-items-center gap-3 my-5"
              >
                <CustomButton
                  isDisabled={isUpdatebuilderPastPropertyLoading}
                  customButtonClass="custom-button-primary rounded-2 px-5 w-100 py-2"
                >
                  {isUpdatebuilderPastPropertyLoading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    'Update'
                  )}
                </CustomButton>
                <CustomButton
                  customButtonClass="custom-button-primary rounded-2 px-5 w-100 py-2"
                  handleAdd={handleAdd}
                >
                  Cancel
                </CustomButton>
              </Col>
            )}
          </Row>
        </Container>
      </Form>
    </>
  );
};

export default AddBuilderPastProperty;
