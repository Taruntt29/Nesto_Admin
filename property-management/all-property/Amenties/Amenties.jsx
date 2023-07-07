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

const Amenties = () => {
  const [files, setFiles] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState(null);
  const [amenityFormData, setAmenityFormData] = useState({
    name: '',
    quantity: '',
  });

  const {
    isLoading: isGetAllAmenitiesLoading,
    isError: isGetAllAmenitiesIsError,
    data: getAllAmenitiesData,
    isSuccess: isGetAllAmenitiesSuccess,
  } = useGetQuery('getAllAmenities', apiEndpoints.getAllAmenities);

  const {
    isLoading: isGetAmenitiesByIdLoading,
    isError: isGetAmenitiesByIdIsError,
    data: getAmenitiesByIdData,
    isSuccess: isGetAmenitiesByIdSuccess,
  } = useGetQueryWithId('getAmenitiesById', apiEndpoints.getAmenitiesById, id);

  const {
    mutate: addAmenities,
    isLoading: isAddAllAmenitiesLoading,
    isError: isAddAllAmenitiesIsError,
    data: addAllAmenitiesData,
    isSuccess: isAddAllAmenitiesSuccess,
  } = usePostMutation(apiEndpoints.addAmenities, 'getAllAmenities');

  const {
    mutate: updateAmenities,
    isLoading: isUpdateAllAmenitiesLoading,
    isError: isUpdateAllAmenitiesIsError,
    data: updateAllAmenitiesData,
    isSuccess: isUpdateAllAmenitiesSuccess,
  } = usePutMutation(apiEndpoints.updateAmenities, 'getAllAmenities');

  const {
    mutate: deleteAmenitiesById,
    isLoading: isDeleteAmenitiesByIdLoading,
    isError: isDeleteAmenitiesByIdIsError,
    data: deleteAmenitiesByIdData,
    isSuccess: isDeleteAmenitiesByIdSuccess,
  } = useDeleteMutation(apiEndpoints.deleteAmenities, 'getAllAmenities');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setAmenityFormData({ ...amenityFormData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(files);

    const formData = new FormData();
    formData.append('name', amenityFormData.name);
    formData.append('quantity', amenityFormData.quantity);
    if (isEditMode) {
      formData.append('id', id);
    }

    for (let i = 0; i < files.length; i++) {
      formData.append('image', files[i]);
    }

    if (isEditMode) {
      updateAmenities(formData);
    } else {
      addAmenities(formData);
      setAmenityFormData(
        Object.keys(amenityFormData).reduce(
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
    setAmenityFormData(
      Object.keys(amenityFormData).reduce(
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
    deleteAmenitiesById(id);
    setIsEditMode(false);
    setId(null);
    setAmenityFormData(
      Object.keys(amenityFormData).reduce(
        (acc, key) => ({ ...acc, [key]: '' }),
        {}
      )
    );
    setFiles([]);
  };

  useEffect(() => {
    if (isGetAmenitiesByIdSuccess && getAmenitiesByIdData) {
      setAmenityFormData({
        name: getAmenitiesByIdData[0]?.name,
        quantity: getAmenitiesByIdData[0]?.quantity,
      });
    }
  }, [isGetAmenitiesByIdSuccess, getAmenitiesByIdData]);

  if (isGetAllAmenitiesLoading) {
    return <LoadingSpinner />;
  }

  if (isGetAllAmenitiesIsError) {
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
                        Amenity
                      </h1>
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id=""
                        label="Amenity Name"
                        type="text"
                        placeholder="Amenity Name"
                        value={
                          isGetAllAmenitiesSuccess && id
                            ? getAmenitiesByIdData[0]?.name
                            : amenityFormData.name
                        }
                        onChange={handleInputChange}
                        inputName="name"
                        InputFieldClassName="input-background"
                        // pattern={NUMBER_TEXT_REGEX}
                        required
                      />
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id=""
                        label="Amenity quantity"
                        type="text"
                        placeholder="Amenity quantity"
                        value={
                          isGetAllAmenitiesSuccess && id
                            ? getAmenitiesByIdData[0]?.quantity
                            : amenityFormData.quantity
                        }
                        inputName="quantity"
                        onChange={handleInputChange}
                        required
                        InputFieldClassName="input-background"
                      />
                    </Col>

                    <Col xs={12}>
                      <div className="mb-2 label-font-size">Amenity icon</div>
                      <FileUpload files={files} setFiles={setFiles} />
                    </Col>
                    <Col xs={12} className="mt-5">
                      <CustomButton
                        isDisabled={isAddAllAmenitiesLoading}
                        customButtonClass="custom-button-primary rounded-2 px-5 w-100 py-2"
                      >
                        {!isGetAmenitiesByIdSuccess &&
                        isAddAllAmenitiesLoading ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          'Add'
                        )}
                        {isGetAmenitiesByIdSuccess && 'Update'}
                      </CustomButton>
                    </Col>
                  </Row>
                </Col>
              )}

              {isEditMode && isGetAmenitiesByIdIsError && (
                <Col xs={5}>
                  <ErrorMessage />
                </Col>
              )}

              {isEditMode && isGetAmenitiesByIdLoading && (
                <Col xs={5}>
                  <LoadingSpinner />
                </Col>
              )}
              {isEditMode && isGetAmenitiesByIdSuccess && (
                <Col xs={5}>
                  <Row className="gy-4">
                    <Col xs={12}>
                      <h1 className="NESTO__admin__main__title pt-3 mb-2">
                        Update Amenity
                      </h1>
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id=""
                        label="Amenity Name"
                        type="text"
                        placeholder="Amenity Name"
                        value={amenityFormData.name}
                        onChange={handleInputChange}
                        inputName="name"
                        InputFieldClassName="input-background"
                        // pattern={NUMBER_TEXT_REGEX}
                        required
                      />
                    </Col>

                    <Col xs={12}>
                      <InputField
                        id=""
                        label="Amenity quantity"
                        type="text"
                        placeholder="Amenity quantity"
                        value={amenityFormData.quantity}
                        inputName="quantity"
                        onChange={handleInputChange}
                        required
                        InputFieldClassName="input-background"
                      />
                    </Col>

                    <Col xs={12}>
                      <div className="mb-2 label-font-size">Amenity icon</div>
                      <FileUpload
                        files={files}
                        setFiles={setFiles}
                        // FileUploadLength={1}
                        isEditMode={isEditMode}
                        image={getAmenitiesByIdData[0]?.image}
                      />
                    </Col>
                    <Col xs={12} className="mt-5">
                      <CustomButton
                        // isDisabled={isAddAllAmenitiesLoading}
                        customButtonClass="custom-button-primary rounded-2 px-5 w-100 py-2 mb-3"
                      >
                        Update
                        {/* {!isGetAmenitiesByIdSuccess &&
                        isAddAllAmenitiesLoading ? (
                          <span
                            className="spinner-border spinner-border-md"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          'Update'
                        )}
                        {isGetAmenitiesByIdSuccess && 'Update'} */}
                      </CustomButton>
                      <CustomButton
                        // isDisabled={isAddAllAmenitiesLoading}
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
                      <th className="text-center">Amenity name</th>
                      <th className="text-center">Amenity quantity</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAllAmenitiesData.map(amenities => (
                      <>
                        {!amenities?.isDeleted && (
                          <tr key={amenities?._id}>
                            <td className="text-center">
                              <Image
                                alt="icon"
                                src={amenities?.image}
                                width="50"
                                height="50"
                                fluid
                              />
                            </td>
                            <td className="text-center">{amenities?.name}</td>
                            <td className="text-center">
                              {amenities?.quantity}
                            </td>
                            <td className="text-center">
                              <ButtonGroup className="gap-2">
                                <Button
                                  variant="transparent"
                                  className="p-0"
                                  onClick={() => handleEdit(amenities?._id)}
                                >
                                  <FiEdit />
                                </Button>
                                <Button
                                  variant="transparent"
                                  className="p-0"
                                  onClick={() => handleDelete(amenities?._id)}
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
                  {!getAllAmenitiesData.filter(
                    amenities => !amenities?.isDeleted
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

export default Amenties;
