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

const NearByArea = () => {
  const [files, setFiles] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState(null);
  const [nearByAreaFormData, setNearByAreaFormData] = useState({
    name: '',
    location: '',
    distance: '',
  });

  const {
    isLoading: isGetAllNearByAreaLoading,
    isError: isGetAllNearByAreaIsError,
    data: getAllNearByAreaData,
    isSuccess: isGetAllNearByAreaSuccess,
  } = useGetQuery('getAllNearByArea', apiEndpoints.getAllNearByArea);

  const {
    isLoading: isGetNearByAreaByIdLoading,
    isError: isGetNearByAreaByIdIsError,
    data: getNearByAreaByIdData,
    isSuccess: isGetNearByAreaByIdSuccess,
  } = useGetQueryWithId(
    'getNearByAreaById',
    apiEndpoints.getNearByAreaById,
    id
  );

  const {
    mutate: addNearByArea,
    isLoading: isAddNearByAreaLoading,
    isError: isAddNearByAreaIsError,
    data: addNearByAreaData,
    isSuccess: isAddNearByAreaSuccess,
  } = usePostMutation(apiEndpoints.addNearByArea, 'getAllNearByArea');

  const {
    mutate: updateNearByArea,
    isLoading: isUpdateNearByAreaLoading,
    isError: isUpdateNearByAreaIsError,
    data: updateNearByAreaData,
    isSuccess: isUpdateNearByAreaSuccess,
  } = usePutMutation(apiEndpoints.updateNearByArea, 'getAllNearByArea');

  const {
    mutate: deleteNearByAreaById,
    isLoading: isDeleteNearByAreaByIdLoading,
    isError: isDeleteNearByAreaByIdIsError,
    data: deleteNearByAreaByIdData,
    isSuccess: isDeleteNearByAreaByIdSuccess,
  } = useDeleteMutation(apiEndpoints.deleteNearByArea, 'getAllNearByArea');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNearByAreaFormData({ ...nearByAreaFormData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', nearByAreaFormData.name);
    formData.append('location', nearByAreaFormData.location);
    formData.append('distance', nearByAreaFormData.distance);
    if (isEditMode) {
      formData.append('id', id);
    }
    for (let i = 0; i < files.length; i++) {
      formData.append('image', files[i]);
    }

    if (isEditMode) {
      updateNearByArea(formData);
    } else {
      addNearByArea(formData);
      setNearByAreaFormData(
        Object.keys(nearByAreaFormData).reduce(
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
    setNearByAreaFormData(
      Object.keys(nearByAreaFormData).reduce(
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
    deleteNearByAreaById(id);
    setIsEditMode(false);
    setId(null);
    setNearByAreaFormData(
      Object.keys(nearByAreaFormData).reduce(
        (acc, key) => ({ ...acc, [key]: '' }),
        {}
      )
    );
    setFiles([]);
  };

  useEffect(() => {
    if (isGetNearByAreaByIdSuccess && getNearByAreaByIdData) {
      setNearByAreaFormData({
        name: getNearByAreaByIdData[0]?.name,
        location: getNearByAreaByIdData[0]?.location,
        distance: getNearByAreaByIdData[0]?.distance,
      });
    }
  }, [isGetNearByAreaByIdSuccess, getNearByAreaByIdData]);

  if (isGetAllNearByAreaLoading) {
    return <LoadingSpinner />;
  }

  if (isGetAllNearByAreaIsError) {
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
                        Near By Area
                      </h1>
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id=""
                        label="Near By Area Name"
                        type="text"
                        placeholder="Near By Area Name"
                        inputName="name"
                        value={
                          isGetAllNearByAreaSuccess && id
                            ? getNearByAreaByIdData[0]?.name
                            : nearByAreaFormData.name
                        }
                        onChange={handleInputChange}
                        InputFieldClassName="input-background"
                        required
                      />
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id=""
                        label="Address"
                        type="text"
                        placeholder="Address"
                        inputName="location"
                        value={
                          isGetAllNearByAreaSuccess && id
                            ? getNearByAreaByIdData[0]?.location
                            : nearByAreaFormData.location
                        }
                        onChange={handleInputChange}
                        InputFieldClassName="input-background"
                        required
                      />
                    </Col>
                    <Col xs={12}>
                      <InputField
                        id=""
                        label="Distance"
                        type="text"
                        placeholder="Distance"
                        inputName="distance"
                        value={
                          isGetAllNearByAreaSuccess && id
                            ? getNearByAreaByIdData[0]?.distance
                            : nearByAreaFormData.distance
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
                        isDisabled={isAddNearByAreaLoading}
                        customButtonClass="custom-button-primary rounded-2 px-5 w-100 py-2"
                      >
                        {!isGetNearByAreaByIdSuccess &&
                        isAddNearByAreaLoading ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          'Add'
                        )}
                        {isGetNearByAreaByIdSuccess && 'Update'}
                      </CustomButton>
                    </Col>
                  </Row>
                </Col>
              )}
              {isEditMode && isGetNearByAreaByIdIsError && (
                <Col xs={5}>
                  <ErrorMessage />
                </Col>
              )}

              {isEditMode && isGetNearByAreaByIdLoading && (
                <Col xs={5}>
                  <LoadingSpinner />
                </Col>
              )}
              {isEditMode && isGetNearByAreaByIdSuccess && (
                <Col xs={5}>
                  <Row className="gy-4">
                    <Col xs={12}>
                      <h1 className="NESTO__admin__main__title pt-3 mb-2">
                        Update Near By Area
                      </h1>
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id=""
                        label="Near By Area Name"
                        type="text"
                        placeholder="Near By Area Name"
                        inputName="name"
                        value={nearByAreaFormData.name}
                        onChange={handleInputChange}
                        InputFieldClassName="input-background"
                        required
                      />
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id=""
                        label="Address"
                        type="text"
                        placeholder="Address"
                        inputName="location"
                        value={nearByAreaFormData.location}
                        onChange={handleInputChange}
                        InputFieldClassName="input-background"
                        required
                      />
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id=""
                        label="Distance"
                        type="text"
                        placeholder="Distance"
                        inputName="distance"
                        value={nearByAreaFormData.distance}
                        onChange={handleInputChange}
                        required
                        InputFieldClassName="input-background"
                      />
                    </Col>

                    <Col xs={12}>
                      <div className="mb-2">Icon</div>
                      <FileUpload
                        files={files}
                        setFiles={setFiles}
                        FileUploadLength={1}
                        isEditMode={isEditMode}
                        image={getNearByAreaByIdData[0]?.image}
                      />
                    </Col>
                    <Col xs={12} className="mt-5">
                      <CustomButton
                        isDisabled={isUpdateNearByAreaLoading}
                        customButtonClass="custom-button-primary rounded-2 px-5 w-100 py-2 mb-3"
                      >
                        {isUpdateNearByAreaLoading ? (
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
                      <th className="text-center">Near By Area Image</th>
                      <th className="text-center">Near By Area Name</th>
                      <th className="text-center">Address</th>
                      <th className="text-center">Distance</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAllNearByAreaData?.map(nearArea => (
                      <>
                        {!nearArea?.isDeleted && (
                          <tr key={nearArea?._id}>
                            <td className="text-center">
                              <Image
                                alt="icon"
                                src={nearArea?.image}
                                width="50"
                                height="50"
                                fluid
                              />
                            </td>
                            <td className="text-center">{nearArea.name}</td>
                            <td className="text-center">{nearArea.location}</td>
                            <td className="text-center">{nearArea.distance}</td>
                            <td className="text-center">
                              <ButtonGroup className="gap-2">
                                <Button
                                  variant="transparent"
                                  className="p-0"
                                  onClick={() => handleEdit(nearArea?._id)}
                                >
                                  <FiEdit />
                                </Button>
                                <Button
                                  variant="transparent"
                                  className="p-0"
                                  onClick={() => handleDelete(nearArea?._id)}
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
                  {!getAllNearByAreaData?.filter(
                    nearArea => !nearArea?.isDeleted
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

export default NearByArea;
