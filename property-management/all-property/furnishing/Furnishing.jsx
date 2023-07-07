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

const Furnishing = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState(null);
  const [furnishingFormData, setFurnishingFormData] = useState({
    name: '',
    furnishingQuantity: '',
  });
  const {
    isLoading: isGetAllFurnishingDetailLoading,
    isError: isGetAllFurnishingDetailIsError,
    data: getAllFurnishingDetailData,
    isSuccess: isGetAllFurnishingDetailSuccess,
  } = useGetQuery(
    'getAllFurnishingDetail',
    apiEndpoints.getAllFurnishingDetail
  );

  const {
    isLoading: isGetFurnishingDetailByIdLoading,
    isError: isGetFurnishingDetailByIdIsError,
    data: getFurnishingDetailByIdData,
    isSuccess: isGetFurnishingDetailByIdSuccess,
  } = useGetQueryWithId(
    'getFurnishingDetailById',
    apiEndpoints.getFurnishingDetailById,
    id
  );

  const {
    mutate: addFurnishingDetail,
    isLoading: isAddFurnishingDetailLoading,
    isError: isAddFurnishingDetailIsError,
    data: addFurnishingDetailData,
    isSuccess: isAddFurnishingDetailSuccess,
  } = usePostMutation(
    apiEndpoints.addFurnishingDetail,
    'getAllFurnishingDetail'
  );

  const {
    mutate: updateFurnishingDetail,
    isLoading: isUpdateFurnishingDetailLoading,
    isError: isUpdateFurnishingDetailIsError,
    data: updateFurnishingDetailData,
    isSuccess: isUpdateFurnishingDetailSuccess,
  } = usePutMutation(
    apiEndpoints.updateFurnishingDetail,
    'getAllFurnishingDetail'
  );

  const {
    mutate: deleteFurnishingDetailById,
    isLoading: isDeleteFurnishingDetailByIdLoading,
    isError: isDeleteFurnishingDetailByIdIsError,
    data: deleteFurnishingDetailByIdData,
    isSuccess: isDeleteFurnishingDetailByIdSuccess,
  } = useDeleteMutation(
    apiEndpoints.deleteFurnishingDetail,
    'getAllFurnishingDetail'
  );

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFurnishingFormData({ ...furnishingFormData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', furnishingFormData.name);
    formData.append(
      'furnishingQuantity',
      furnishingFormData.furnishingQuantity
    );
    if (isEditMode) {
      formData.append('id', id);
    }

    if (isEditMode) {
      updateFurnishingDetail(formData);
    } else {
      addFurnishingDetail(formData);
      setFurnishingFormData(
        Object.keys(furnishingFormData).reduce(
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
    setFurnishingFormData(
      Object.keys(furnishingFormData).reduce(
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
    deleteFurnishingDetailById(id);
    setIsEditMode(false);
    setId(null);
    setFurnishingFormData(
      Object.keys(furnishingFormData).reduce(
        (acc, key) => ({ ...acc, [key]: '' }),
        {}
      )
    );
  };

  useEffect(() => {
    if (isGetFurnishingDetailByIdSuccess && getFurnishingDetailByIdData) {
      setFurnishingFormData({
        name: getFurnishingDetailByIdData[0]?.name,
        furnishingQuantity: getFurnishingDetailByIdData[0]?.furnishingQuantity,
      });
    }
  }, [isGetFurnishingDetailByIdSuccess, getFurnishingDetailByIdData]);

  if (isGetAllFurnishingDetailLoading) {
    return <LoadingSpinner />;
  }

  if (isGetAllFurnishingDetailIsError) {
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
                        Furnishing Detail
                      </h1>
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id=""
                        label="Furnishing Quantity"
                        type="text"
                        placeholder="Furnishing Quantity"
                        inputName="furnishingQuantity"
                        value={
                          isGetAllFurnishingDetailSuccess && id
                            ? getFurnishingDetailByIdData[0]?.furnishingQuantity
                            : furnishingFormData.furnishingQuantity
                        }
                        onChange={handleInputChange}
                        InputFieldClassName="input-background"
                        required
                      />
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id=""
                        label="Name"
                        type="text"
                        placeholder="Name"
                        inputName="name"
                        value={
                          isGetAllFurnishingDetailSuccess && id
                            ? getFurnishingDetailByIdData[0]?.name
                            : furnishingFormData.name
                        }
                        onChange={handleInputChange}
                        InputFieldClassName="input-background"
                        required
                      />
                    </Col>

                    <Col xs={12} className="mt-5">
                      <CustomButton
                        isDisabled={isAddFurnishingDetailLoading}
                        customButtonClass="custom-button-primary rounded-2 px-5 w-100 py-2"
                      >
                        {!isGetFurnishingDetailByIdSuccess &&
                        isAddFurnishingDetailLoading ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          'Add'
                        )}
                        {isGetFurnishingDetailByIdSuccess && 'Update'}
                      </CustomButton>
                    </Col>
                  </Row>
                </Col>
              )}
              {isEditMode && isGetFurnishingDetailByIdIsError && (
                <Col xs={5}>
                  <ErrorMessage />
                </Col>
              )}

              {isEditMode && isGetFurnishingDetailByIdLoading && (
                <Col xs={5}>
                  <LoadingSpinner />
                </Col>
              )}
              {isEditMode && isGetFurnishingDetailByIdSuccess && (
                <Col xs={5}>
                  <Row className="gy-4">
                    <Col xs={12}>
                      <h1 className="NESTO__admin__main__title pt-3 mb-2">
                        Update Furnishing Detail
                      </h1>
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id=""
                        label="Furnishing Quantity"
                        type="text"
                        placeholder="Furnishing Quantity"
                        inputName="furnishingQuantity"
                        value={furnishingFormData.furnishingQuantity}
                        onChange={handleInputChange}
                        InputFieldClassName="input-background"
                        required
                      />
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id=""
                        label="Name"
                        type="text"
                        placeholder="Name"
                        inputName="name"
                        value={furnishingFormData.name}
                        onChange={handleInputChange}
                        InputFieldClassName="input-background"
                        required
                      />
                    </Col>

                    <Col xs={12} className="mt-5">
                      <CustomButton
                        isDisabled={isUpdateFurnishingDetailLoading}
                        customButtonClass="custom-button-primary rounded-2 px-5 w-100 py-2 mb-3"
                      >
                        {isUpdateFurnishingDetailLoading ? (
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
                      <th className="text-center">Furnishing Quantity</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAllFurnishingDetailData?.map(furnishingDetail => (
                      <>
                        {!furnishingDetail?.isDeleted && (
                          <tr key={furnishingDetail?._id}>
                            <td className="text-center">
                              {furnishingDetail.furnishingQuantity}
                            </td>
                            <td className="text-center">
                              {furnishingDetail.name}
                            </td>

                            <td className="text-center">
                              <ButtonGroup className="gap-2">
                                <Button
                                  variant="transparent"
                                  className="p-0"
                                  onClick={() =>
                                    handleEdit(furnishingDetail?._id)
                                  }
                                >
                                  <FiEdit />
                                </Button>
                                <Button
                                  variant="transparent"
                                  className="p-0"
                                  onClick={() =>
                                    handleDelete(furnishingDetail?._id)
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
                  {!getAllFurnishingDetailData?.filter(
                    furnishingDetail => !furnishingDetail?.isDeleted
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

export default Furnishing;
