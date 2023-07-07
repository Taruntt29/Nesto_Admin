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
import { FiEdit } from 'react-icons/fi';
import { BsTrash3 } from 'react-icons/bs';
import {
  CustomButton,
  ErrorMessage,
  InputField,
  LoadingSpinner,
} from '../../../../../components';

import {
  useDeleteMutation,
  useGetQuery,
  useGetQueryWithId,
  usePostMutation,
  usePutMutation,
} from '../../../../../hooks/tanstackQuery';
import { useState } from 'react';
import { apiEndpoints } from '../../../../../config/apiEndpoints';
import { NUMBER_TEXT_REGEX } from '../../../../../config/regex';
import { useEffect } from 'react';
import FileUpload from '../../../../../components/file-upload/FileUpload';

const PropertyType = () => {
  const [files, setFiles] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState(null);
  const [propertyTypeFormData, setPropertyTypeFormData] = useState({
    name: '',
    icon: '',
    parentId: null,
  });
  const [parentCategory, setParentCategory] = useState('');

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

  const {
    mutate: addPropertyCategory,
    isLoading: isAddPropertyCategoryLoading,
    isError: isAddPropertyCategoryIsError,
    data: addPropertyCategoryData,
    isSuccess: isAddPropertyCategorySuccess,
  } = usePostMutation(
    apiEndpoints.addPropertyCategory,
    'getAllPropertyCategory'
  );
  const {
    mutate: addPropertySubCategory,
    isLoading: isAddPropertySubCategoryLoading,
    isError: isAddPropertySubCategoryIsError,
    data: addPropertySubCategoryData,
    isSuccess: isAddPropertySubCategorySuccess,
  } = usePostMutation(
    apiEndpoints.addPropertySubCategory,
    'getAllPropertyCategory'
  );

  const {
    isLoading: isGetPropertyCategoryByIdLoading,
    isError: isGetPropertyCategoryByIdIsError,
    data: getPropertyCategoryByIdData,
    isSuccess: isGetPropertyCategoryByIdSuccess,
  } = useGetQueryWithId(
    'getPropertyCategoryById',
    apiEndpoints.getPropertyCategoryById,
    id
  );

  const {
    mutate: updatePropertyCategory,
    isLoading: isUpdateAllPropertyCategoryLoading,
    isError: isUpdateAllPropertyCategoryIsError,
    data: updateAllPropertyCategoryData,
    isSuccess: isUpdateAllPropertyCategorySuccess,
  } = usePutMutation(
    apiEndpoints.updatePropertyCategory,
    'getAllPropertyCategory'
  );

  const {
    mutate: deletePropertyCategoryById,
    isLoading: isDeletePropertyCategoryByIdLoading,
    isError: isDeletePropertyCategoryByIdIsError,
    data: deletePropertyCategoryByIdData,
    isSuccess: isDeletePropertyCategoryByIdSuccess,
  } = useDeleteMutation(
    apiEndpoints.deletePropertyCategory,
    'getAllPropertyCategory'
  );

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name === 'parentId') {
      const { id } = e.target.selectedOptions[0].dataset;

      setParentCategory(value);
      setPropertyTypeFormData(prevPropertyTypeFormData => ({
        ...prevPropertyTypeFormData,
        [name]: id,
      }));
    } else {
      setPropertyTypeFormData({ ...propertyTypeFormData, [name]: value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    if (!isEditMode) {
      if (!propertyTypeFormData.parentId) {
        Object.entries({ name: propertyTypeFormData.name }).forEach(
          ([key, value]) => {
            formData.append(
              key,
              Array.isArray(value) ? JSON.stringify(value) : value
            );
          }
        );
        for (let i = 0; i < files.length; i++) {
          formData.append('icon', files[i]);
        }
        console.log(Array.from(formData));

        addPropertyCategory(formData);
        setPropertyTypeFormData(
          Object.keys(propertyTypeFormData).reduce(
            (acc, key) => ({ ...acc, [key]: '' }),
            {}
          )
        );
        setFiles([]);
      } else {
        Object.entries({
          name: propertyTypeFormData.name,
          parentId: propertyTypeFormData.parentId,
        }).forEach(([key, value]) => {
          formData.append(
            key,
            Array.isArray(value) ? JSON.stringify(value) : value
          );
        });

        addPropertySubCategory(formData);
        setPropertyTypeFormData(
          Object.keys(propertyTypeFormData).reduce(
            (acc, key) => ({ ...acc, [key]: '' }),
            {}
          )
        );
      }
    }

    if (isEditMode) {
      Object.entries({ name: propertyTypeFormData.name }).forEach(
        ([key, value]) => {
          formData.append(
            key,
            Array.isArray(value) ? JSON.stringify(value) : value
          );
        }
      );
      for (let i = 0; i < files.length; i++) {
        formData.append('icon', files[i]);
      }
      formData.append('id', id);
      updatePropertyCategory(formData);
    }
    //  else {
    //   addPropertyCategory(formData);
    //   setPropertyTypeFormData(
    //     Object.keys(propertyTypeFormData).reduce(
    //       (acc, key) => ({ ...acc, [key]: '' }),
    //       {}
    //     )
    //   );
    //   setFiles([]);
    // }
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setId(null);
    setPropertyTypeFormData(
      Object.keys(propertyTypeFormData).reduce(
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
    deletePropertyCategoryById(id);
    setIsEditMode(false);
    setId(null);
    setPropertyTypeFormData(
      Object.keys(propertyTypeFormData).reduce(
        (acc, key) => ({ ...acc, [key]: '' }),
        {}
      )
    );
    setFiles([]);
  };

  useEffect(() => {
    if (isGetPropertyCategoryByIdSuccess && getPropertyCategoryByIdData) {
      setPropertyTypeFormData({
        name: getPropertyCategoryByIdData[0]?.name,
        iconUrl: getPropertyCategoryByIdData[0]?.iconUrl,
      });
    }
  }, [isGetPropertyCategoryByIdSuccess, getPropertyCategoryByIdData]);

  if (isGetAllPropertyCategoryLoading) {
    return <LoadingSpinner />;
  }

  if (isGetAllPropertyCategoryIsError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <section className="NESTO__admin__main__add__property__section  m-3 px-4 py-4">
        <Container>
          <Form onSubmit={handleSubmit}>
            <Row className="gx-5 d-flex">
              {!isEditMode && (
                <Col xs={5}>
                  <Row className="gy-4">
                    <Col xs={12}>
                      <h1 className="NESTO__admin__main__title pt-3 mb-2">
                        Property Type
                      </h1>
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id="name"
                        label="Property type"
                        type="text"
                        placeholder="Property type"
                        value={
                          isGetAllPropertyCategorySuccess && id
                            ? getPropertyCategoryByIdData[0]?.name
                            : propertyTypeFormData.name
                        }
                        onChange={handleInputChange}
                        inputName="name"
                        InputFieldClassName="input-background"
                        required
                      />
                    </Col>

                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label>Parent Property type</Form.Label>
                        <Form.Control
                          size="lg"
                          as="select"
                          placeholder="Parent Property type"
                          value={parentCategory}
                          onChange={handleInputChange}
                          className="input-background"
                          name="parentId"
                        >
                          <option value="">Choose Parent Property</option>
                          {getAllPropertyCategoryData.map(propertyCategory => {
                            if (propertyCategory.name) {
                              return (
                                <option
                                  key={propertyCategory?._id}
                                  value={propertyCategory.name}
                                  data-id={propertyCategory?._id}
                                >
                                  {propertyCategory.name}
                                </option>
                              );
                            }
                          })}
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    {!propertyTypeFormData.parentId && (
                      <Col xs={12}>
                        <div className="mb-2 label-font-size">
                          Property Type Icon
                        </div>

                        {/* <FileUpload files={files} setFiles={setFiles} /> */}
                        <FileUpload files={files} setFiles={setFiles} />
                      </Col>
                    )}

                    <Col xs={12} className="mt-5">
                      <CustomButton
                        isDisabled={isAddPropertyCategoryLoading}
                        customButtonClass="custom-button-primary rounded-2 px-5 w-100 py-2"
                      >
                        {!isGetPropertyCategoryByIdSuccess &&
                        isAddPropertyCategoryLoading ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          'Add'
                        )}
                        {isGetPropertyCategoryByIdSuccess && 'Update'}
                      </CustomButton>
                    </Col>
                  </Row>
                </Col>
              )}

              {isEditMode && isGetPropertyCategoryByIdIsError && (
                <Col xs={5}>
                  <ErrorMessage />
                </Col>
              )}

              {isEditMode && isGetPropertyCategoryByIdLoading && (
                <Col xs={5}>
                  <LoadingSpinner />
                </Col>
              )}
              {isEditMode && isGetPropertyCategoryByIdSuccess && (
                <Col xs={5}>
                  <Row className="gy-4">
                    <Col xs={12}>
                      <h1 className="NESTO__admin__main__title pt-3 mb-2">
                        Update Property Type
                      </h1>
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id="name"
                        label="Property type"
                        type="text"
                        placeholder="Property type"
                        value={propertyTypeFormData.name}
                        inputName="name"
                        onChange={handleInputChange}
                        required
                        InputFieldClassName="input-background"
                      />
                    </Col>

                    <Col xs={12}>
                      <div className="mb-2 label-font-size">
                        Property Type Icon
                      </div>
                      <FileUpload
                        files={files}
                        setFiles={setFiles}
                        // FileUploadLength={1}
                        isEditMode={isEditMode}
                        image={getPropertyCategoryByIdData[0]?.iconUrl}
                      />
                    </Col>
                    <Col xs={12} className="mt-5">
                      <CustomButton
                        // isDisabled={isAddPropertyCategoryLoading}
                        customButtonClass="custom-button-primary rounded-2 px-5 w-100 py-2 mb-3"
                      >
                        Update
                        {/* {!isGetPropertyCategoryByIdSuccess &&
                        isAddPropertyCategoryLoading ? (
                          <span
                            className="spinner-border spinner-border-md"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          'Update'
                        )}
                        {isGetPropertyCategoryByIdSuccess && 'Update'} */}
                      </CustomButton>
                      <CustomButton
                        // isDisabled={isAddPropertyCategoryLoading}
                        customButtonClass="custom-button-primary rounded-2 px-5 w-100 py-2"
                        handleAdd={handleAdd}
                      >
                        Cancel
                      </CustomButton>
                    </Col>
                  </Row>
                </Col>
              )}
              <Col xs={7}>
                <Table className="mt-3" bordered responsive>
                  <thead>
                    <tr>
                      <th className="text-center">Icon</th>
                      <th className="text-center">Property Type</th>
                      <th className="text-center">Child Property Type</th>
                      <th className="text-center">Count</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAllPropertyCategoryData.map(propertyCategory => (
                      <>
                        {!propertyCategory?.isDeleted && (
                          <tr key={propertyCategory?._id}>
                            <td className="text-center">
                              <Image
                                alt="icon"
                                src={propertyCategory?.iconUrl}
                                width="50"
                                height="50"
                                fluid
                              />
                            </td>
                            <td className="text-center">
                              {propertyCategory?.name}
                            </td>
                            <td className="text-center"></td>
                            <td className="text-center">
                              {propertyCategory?.totalCount}
                            </td>
                            <td className="text-center">
                              <ButtonGroup className="gap-2">
                                <Button
                                  variant="transparent"
                                  className="p-0"
                                  onClick={() =>
                                    handleEdit(propertyCategory?._id)
                                  }
                                >
                                  <FiEdit />
                                </Button>
                                <Button
                                  variant="transparent"
                                  className="p-0"
                                  onClick={() =>
                                    handleDelete(propertyCategory?._id)
                                  }
                                >
                                  <BsTrash3 />
                                </Button>
                              </ButtonGroup>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                  {!getAllPropertyCategoryData.filter(
                    propertyCategory => !propertyCategory?.isDeleted
                  ).length && (
                    <tfoot>
                      <tr className="no-data-row text-center">
                        <td colspan="4">No data to display</td>
                      </tr>
                    </tfoot>
                  )}
                </Table>
              </Col>
            </Row>
          </Form>
        </Container>
      </section>
    </>
  );
};

export default PropertyType;
