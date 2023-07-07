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

const LocationAdvantages = () => {
  const [files, setFiles] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState(null);
  const [locationFormData, setLocationFormData] = useState({
    name: '',
    distance: '',
  });

  const {
    isLoading: isGetAllLocationAdvantageLoading,
    isError: isGetAllLocationAdvantageIsError,
    data: getAllLocationAdvantageData,
    isSuccess: isGetAllLocationAdvantageSuccess,
  } = useGetQuery(
    'getAllLocationAdvantage',
    apiEndpoints.getAllLocationAdvantage
  );

  const {
    isLoading: isGetLocationAdvantageByIdLoading,
    isError: isGetLocationAdvantageByIdIsError,
    data: getLocationAdvantageByIdData,
    isSuccess: isGetLocationAdvantageByIdSuccess,
  } = useGetQueryWithId(
    'getLocationAdvantageById',
    apiEndpoints.getLocationAdvantageById,
    id
  );

  const {
    mutate: addLocationAdvantage,
    isLoading: isAddLocationAdvantageLoading,
    isError: isAddLocationAdvantageIsError,
    data: addLocationAdvantageData,
    isSuccess: isAddLocationAdvantageSuccess,
  } = usePostMutation(
    apiEndpoints.addLocationAdvantage,
    'getAllLocationAdvantage'
  );

  const {
    mutate: updateLocationAdvantage,
    isLoading: isUpdateAllLocationAdvantageLoading,
    isError: isUpdateAllLocationAdvantageIsError,
    data: updateAllLocationAdvantageData,
    isSuccess: isUpdateAllLocationAdvantageSuccess,
  } = usePutMutation(
    apiEndpoints.updateLocationAdvantage,
    'getAllLocationAdvantage'
  );

  const {
    mutate: deleteLocationAdvantageById,
    isLoading: isDeleteLocationAdvantageByIdLoading,
    isError: isDeleteLocationAdvantageByIdIsError,
    data: deleteLocationAdvantageByIdData,
    isSuccess: isDeleteLocationAdvantageByIdSuccess,
  } = useDeleteMutation(
    apiEndpoints.deleteLocationAdvantage,
    'getAllLocationAdvantage'
  );

  const handleInputChange = e => {
    const { name, value } = e.target;
    setLocationFormData({ ...locationFormData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', locationFormData.name);
    formData.append('distance', locationFormData.distance);
    if (isEditMode) {
      formData.append('id', id);
    }
    for (let i = 0; i < files.length; i++) {
      formData.append('image', files[i]);
    }

    if (isEditMode) {
      updateLocationAdvantage(formData);
    } else {
      addLocationAdvantage(formData);
      setLocationFormData(
        Object.keys(locationFormData).reduce(
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
    setLocationFormData(
      Object.keys(locationFormData).reduce(
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
    deleteLocationAdvantageById(id);
    setIsEditMode(false);
    setId(null);
    setLocationFormData(
      Object.keys(locationFormData).reduce(
        (acc, key) => ({ ...acc, [key]: '' }),
        {}
      )
    );
    setFiles([]);
  };

  useEffect(() => {
    if (isGetLocationAdvantageByIdSuccess && getLocationAdvantageByIdData) {
      setLocationFormData({
        name: getLocationAdvantageByIdData[0]?.name,
        distance: getLocationAdvantageByIdData[0]?.distance,
      });
    }
  }, [isGetLocationAdvantageByIdSuccess, getLocationAdvantageByIdData]);

  if (isGetAllLocationAdvantageLoading) {
    return <LoadingSpinner />;
  }

  if (isGetAllLocationAdvantageIsError) {
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
                        Location Advantages
                      </h1>
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id=""
                        label="Location name"
                        type="text"
                        placeholder="Location name"
                        inputName="name"
                        value={
                          isGetAllLocationAdvantageSuccess && id
                            ? getLocationAdvantageByIdData[0]?.name
                            : locationFormData.name
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
                        value={
                          isGetAllLocationAdvantageSuccess && id
                            ? getLocationAdvantageByIdData[0]?.distance
                            : locationFormData.distance
                        }
                        onChange={handleInputChange}
                        inputName="distance"
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
                        isDisabled={isAddLocationAdvantageLoading}
                        customButtonClass="custom-button-primary rounded-2 px-5 w-100 py-2"
                      >
                        {!isGetLocationAdvantageByIdSuccess &&
                        isAddLocationAdvantageLoading ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          'Add'
                        )}
                        {isGetLocationAdvantageByIdSuccess && 'Update'}
                      </CustomButton>
                    </Col>
                  </Row>
                </Col>
              )}
              {isEditMode && isGetLocationAdvantageByIdIsError && (
                <Col xs={5}>
                  <ErrorMessage />
                </Col>
              )}

              {isEditMode && isGetLocationAdvantageByIdLoading && (
                <Col xs={5}>
                  <LoadingSpinner />
                </Col>
              )}
              {isEditMode && isGetLocationAdvantageByIdSuccess && (
                <Col xs={5}>
                  <Row className="gy-4">
                    <Col xs={12}>
                      <h1 className="NESTO__admin__main__title pt-3 mb-2">
                        Update Location Advantages
                      </h1>
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id=""
                        label="Location name"
                        type="text"
                        placeholder="Location name"
                        inputName="name"
                        value={locationFormData.name}
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
                        value={locationFormData.distance}
                        onChange={handleInputChange}
                        inputName="distance"
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
                        image={getLocationAdvantageByIdData[0]?.image}
                      />
                    </Col>
                    <Col xs={12} className="mt-5">
                      <CustomButton
                        isDisabled={isUpdateAllLocationAdvantageLoading}
                        customButtonClass="custom-button-primary rounded-2 px-5 w-100 py-2 mb-3"
                      >
                        {isUpdateAllLocationAdvantageLoading ? (
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
                      <th className="text-center">Location Name</th>
                      <th className="text-center">Location Distance</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAllLocationAdvantageData?.map(location => (
                      <>
                        {!location?.isDeleted && (
                          <tr key={location?._id}>
                            <td className="text-center">
                              <Image
                                alt="icon"
                                src={location?.image}
                                width="50"
                                height="50"
                                fluid
                              />
                            </td>
                            <td className="text-center">{location.name}</td>
                            <td className="text-center">{location.distance}</td>
                            <td className="text-center">
                              <ButtonGroup className="gap-2">
                                <Button
                                  variant="transparent"
                                  className="p-0"
                                  onClick={() => handleEdit(location?._id)}
                                >
                                  <FiEdit />
                                </Button>
                                <Button
                                  variant="transparent"
                                  className="p-0"
                                  onClick={() => handleDelete(location?._id)}
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
                  {!getAllLocationAdvantageData?.filter(
                    locations => !locations?.isDeleted
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

export default LocationAdvantages;
