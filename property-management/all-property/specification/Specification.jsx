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
import FileUpload from '../../../../../components/file-upload/FileUpload';
import {
  usePostMutation,
  useGetQuery,
  usePutMutation,
  useDeleteMutation,
  useGetQueryWithId,
} from '../../../../../hooks/tanstackQuery';
import { useEffect, useState } from 'react';
import { apiEndpoints } from '../../../../../config/apiEndpoints';

const Specification = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState(null);
  const [specificationFormData, setSpecificationFormData] = useState({
    name: '',
  });
  const {
    isLoading: isGetAllSpecificationLoading,
    isError: isGetAllSpecificationIsError,
    data: getAllSpecificationData,
    isSuccess: isGetAllSpecificationSuccess,
  } = useGetQuery('getAllSpecification', apiEndpoints.getAllSpecification);

  const {
    isLoading: isGetSpecificationByIdLoading,
    isError: isGetSpecificationByIdIsError,
    data: getSpecificationByIdData,
    isSuccess: isGetSpecificationByIdSuccess,
  } = useGetQueryWithId(
    'getSpecificationById',
    apiEndpoints.getSpecificationById,
    id
  );

  const {
    mutate: addSpecification,
    isLoading: isAddSpecificationLoading,
    isError: isAddSpecificationIsError,
    data: addSpecificationData,
    isSuccess: isAddSpecificationSuccess,
  } = usePostMutation(apiEndpoints.addSpecification, 'getAllSpecification');

  const {
    mutate: updateSpecification,
    isLoading: isUpdateSpecificationLoading,
    isError: isUpdateSpecificationIsError,
    data: updateSpecificationData,
    isSuccess: isUpdateSpecificationSuccess,
  } = usePutMutation(apiEndpoints.updateSpecification, 'getAllSpecification');

  const {
    mutate: deleteSpecificationById,
    isLoading: isDeleteSpecificationByIdLoading,
    isError: isDeleteSpecificationByIdIsError,
    data: deleteSpecificationByIdData,
    isSuccess: isDeleteSpecificationByIdSuccess,
  } = useDeleteMutation(
    apiEndpoints.deleteSpecification,
    'getAllSpecification'
  );

  const handleInputChange = e => {
    const { name, value } = e.target;
    setSpecificationFormData({ ...specificationFormData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', specificationFormData.name);

    if (isEditMode) {
      formData.append('id', id);
    }

    if (isEditMode) {
      updateSpecification(formData);
    } else {
      addSpecification(formData);
      setSpecificationFormData(
        Object.keys(specificationFormData).reduce(
          (acc, key) => ({ ...acc, [key]: '' }),
          {}
        )
      );
    }
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setId(null);
    setSpecificationFormData(
      Object.keys(specificationFormData).reduce(
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
    deleteSpecificationById(id);
    setIsEditMode(false);
    setId(null);
    setSpecificationFormData(
      Object.keys(specificationFormData).reduce(
        (acc, key) => ({ ...acc, [key]: '' }),
        {}
      )
    );
    setFiles([]);
  };

  useEffect(() => {
    if (isGetSpecificationByIdSuccess && getSpecificationByIdData) {
      setSpecificationFormData({
        name: getSpecificationByIdData[0]?.name,
      });
    }
  }, [isGetSpecificationByIdSuccess, getSpecificationByIdData]);

  if (isGetAllSpecificationLoading) {
    return <LoadingSpinner />;
  }

  if (isGetAllSpecificationIsError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <section className="NESTO__admin__main__add__property__section m-3 px-4 py-4">
        <Container>
          <Form onSubmit={handleSubmit}>
            <Row className="gx-5 d-flex">
              {!isEditMode && (
                <Col xs={5}>
                  <Row className="gy-4">
                    <Col xs={12}>
                      <h1 className="NESTO__admin__main__title pt-3 mb-2">
                        Specifications
                      </h1>
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id=""
                        label="Name"
                        type="text"
                        placeholder="Name"
                        inputName="name"
                        value={
                          isGetAllSpecificationSuccess && id
                            ? getSpecificationByIdData[0]?.name
                            : specificationFormData.name
                        }
                        onChange={handleInputChange}
                        InputFieldClassName="input-background"
                        required
                      />
                    </Col>

                    <Col xs={12} className="mt-5">
                      <CustomButton
                        isDisabled={isAddSpecificationLoading}
                        customButtonClass="custom-button-primary rounded-2 px-5 w-100 py-2"
                      >
                        {!isGetSpecificationByIdSuccess &&
                        isAddSpecificationLoading ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          'Add'
                        )}
                        {isGetSpecificationByIdSuccess && 'Update'}
                      </CustomButton>
                    </Col>
                  </Row>
                </Col>
              )}
              {isEditMode && isGetSpecificationByIdIsError && (
                <Col xs={5}>
                  <ErrorMessage />
                </Col>
              )}

              {isEditMode && isGetSpecificationByIdLoading && (
                <Col xs={5}>
                  <LoadingSpinner />
                </Col>
              )}
              {isEditMode && isGetSpecificationByIdSuccess && (
                <Col xs={5}>
                  <Row className="gy-4">
                    <Col xs={12}>
                      <h1 className="NESTO__admin__main__title pt-3 mb-2">
                        Update Specification
                      </h1>
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id=""
                        label="Name"
                        type="text"
                        placeholder="Name"
                        inputName="name"
                        value={specificationFormData.name}
                        onChange={handleInputChange}
                        InputFieldClassName="input-background"
                        required
                      />
                    </Col>

                    <Col xs={12} className="mt-5">
                      <CustomButton
                        isDisabled={isUpdateSpecificationLoading}
                        customButtonClass="custom-button-primary rounded-2 px-5 w-100 py-2 mb-3"
                      >
                        {isUpdateSpecificationLoading ? (
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
                  </Row>
                </Col>
              )}
              <Col xs={7}>
                <Table className="mt-3" bordered responsive>
                  <thead>
                    <tr>
                      <th className="text-center">Name</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAllSpecificationData?.map(specification => (
                      <>
                        {!specification?.isDeleted && (
                          <tr key={specification?._id}>
                            <td className="text-center">
                              {specification.name}
                            </td>

                            <td className="text-center">
                              <ButtonGroup className="gap-2">
                                <Button
                                  variant="transparent"
                                  className="p-0"
                                  onClick={() => handleEdit(specification?._id)}
                                >
                                  <FiEdit />
                                </Button>
                                <Button
                                  variant="transparent"
                                  className="p-0"
                                  onClick={() =>
                                    handleDelete(specification?._id)
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
                  {!getAllSpecificationData?.filter(
                    specification => !specification?.isDeleted
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

export default Specification;
