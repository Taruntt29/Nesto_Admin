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
import FileUploader from '../../../../../components/file-uploader/FileUploader';

const LoanApproved = () => {
  const [files, setFiles] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState(null);
  const [bankFormData, setBankFormData] = useState({
    name: '',
  });

  const {
    isLoading: isGetAllBankLoading,
    isError: isGetAllBankIsError,
    data: getAllBankData,
    isSuccess: isGetAllBankSuccess,
  } = useGetQuery('getAllBank', apiEndpoints.getAllBank);

  const {
    isLoading: isGetBankByIdLoading,
    isError: isGetBankByIdIsError,
    data: getBankByIdData,
    isSuccess: isGetBankByIdSuccess,
  } = useGetQueryWithId('getBankById', apiEndpoints.getBankById, id);

  const {
    mutate: addBank,
    isLoading: isAddBankLoading,
    isError: isAddBankIsError,
    data: addBankData,
    isSuccess: isAddBankSuccess,
  } = usePostMutation(apiEndpoints.addBank, 'getAllBank');

  const {
    mutate: updateBank,
    isLoading: isUpdateBankLoading,
    isError: isUpdateBankIsError,
    data: updateBankData,
    isSuccess: isUpdateBankSuccess,
  } = usePutMutation(apiEndpoints.updateBank, 'getAllBank');

  const {
    mutate: deleteBankById,
    isLoading: isDeleteBankByIdLoading,
    isError: isDeleteBankByIdIsError,
    data: deleteBankByIdData,
    isSuccess: isDeleteBankByIdSuccess,
  } = useDeleteMutation(apiEndpoints.deleteBank, 'getAllBank');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setBankFormData({ ...bankFormData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', bankFormData.name);

    if (isEditMode) {
      formData.append('id', id);
    }
    for (let i = 0; i < files.length; i++) {
      formData.append('image', files[i]);
    }

    if (isEditMode) {
      updateBank(formData);
    } else {
      addBank(formData);
      setBankFormData(
        Object.keys(bankFormData).reduce(
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
    setBankFormData(
      Object.keys(bankFormData).reduce(
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
    deleteBankById(id);
    setIsEditMode(false);
    setId(null);
    setBankFormData(
      Object.keys(bankFormData).reduce(
        (acc, key) => ({ ...acc, [key]: '' }),
        {}
      )
    );
    setFiles([]);
  };

  useEffect(() => {
    if (isGetBankByIdSuccess && getBankByIdData) {
      setBankFormData({
        name: getBankByIdData[0]?.name,
      });
    }
  }, [isGetBankByIdSuccess, getBankByIdData]);

  if (isGetAllBankLoading) {
    return <LoadingSpinner />;
  }

  if (isGetAllBankIsError) {
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
                        Loan Approved By
                      </h1>
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id=""
                        label="Bank Name"
                        type="text"
                        placeholder="Bank Name"
                        inputName="name"
                        value={
                          isGetAllBankSuccess && id
                            ? getBankByIdData[0]?.name
                            : bankFormData.name
                        }
                        onChange={handleInputChange}
                        InputFieldClassName="input-background"
                        required
                      />
                    </Col>

                    <Col xs={12}>
                      <div className="mb-2">Icon</div>
                      {/* <FileUpload
                        files={files}
                        setFiles={setFiles}
                        FileUploadLength={1}
                      /> */}
                      <FileUploader
                        files={files}
                        setFiles={setFiles}
                        multiple={false}
                      />
                    </Col>
                    <Col xs={12} className="mt-5">
                      <CustomButton
                        isDisabled={isAddBankLoading}
                        customButtonClass="custom-button-primary rounded-2 px-5 w-100 py-2"
                      >
                        {!isGetBankByIdSuccess && isAddBankLoading ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          'Add'
                        )}
                        {isGetBankByIdSuccess && 'Update'}
                      </CustomButton>
                    </Col>
                  </Row>
                </Col>
              )}
              {isEditMode && isGetBankByIdIsError && (
                <Col xs={5}>
                  <ErrorMessage />
                </Col>
              )}

              {isEditMode && isGetBankByIdLoading && (
                <Col xs={5}>
                  <LoadingSpinner />
                </Col>
              )}
              {isEditMode && isGetBankByIdSuccess && (
                <Col xs={5}>
                  <Row className="gy-4">
                    <Col xs={12}>
                      <h1 className="NESTO__admin__main__title pt-3 mb-2">
                        Update Loan Approved By
                      </h1>
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id=""
                        label="Bank Name"
                        type="text"
                        placeholder="Bank Name"
                        inputName="name"
                        value={bankFormData.name}
                        onChange={handleInputChange}
                        InputFieldClassName="input-background"
                        required
                      />
                    </Col>

                    <Col xs={12}>
                      <div className="mb-2">Icon</div>
                      <FileUpload
                        files={files}
                        setFiles={setFiles}
                        FileUploadLength={1}
                        isEditMode={isEditMode}
                        image={getBankByIdData[0]?.image}
                      />
                    </Col>
                    <Col xs={12} className="mt-5">
                      <CustomButton
                        isDisabled={isUpdateBankLoading}
                        customButtonClass="custom-button-primary rounded-2 px-5 w-100 py-2 mb-3"
                      >
                        {isUpdateBankLoading ? (
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
                      <th className="text-center">Icon</th>
                      <th className="text-center">Bank Name</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAllBankData?.map(bank => (
                      <>
                        {!bank?.isDeleted && (
                          <tr key={bank?._id}>
                            <td className="text-center">
                              <Image
                                alt="icon"
                                src={bank?.image}
                                width="50"
                                height="50"
                                fluid
                              />
                            </td>
                            <td className="text-center">{bank?.name}</td>

                            <td className="text-center">
                              <ButtonGroup className="gap-2">
                                <Button
                                  variant="transparent"
                                  className="p-0"
                                  onClick={() => handleEdit(bank?._id)}
                                >
                                  <FiEdit />
                                </Button>
                                <Button
                                  variant="transparent"
                                  className="p-0"
                                  onClick={() => handleDelete(bank?._id)}
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
                  {!getAllBankData?.filter(banks => !banks?.isDeleted)
                    .length && (
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

export default LoanApproved;
