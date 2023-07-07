import React, { useEffect, useState } from 'react';
import { Col, Form, Modal } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { useGetQueryWithId } from '../../../../../../hooks/tanstackQuery';
import { apiEndpoints } from '../../../../../../config/apiEndpoints';
import { useDispatch } from 'react-redux';
import { setPropertyTypeString } from '../../../../../../store/store';
import { customStyles } from '../../../../../../data/Constant';
import { CustomButton } from '../../../../../../components';

const CreatableSelectWithModal = ({ categoryData, setPropertyFormData }) => {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoriesName, setSelectedCategoriesName] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [parentId, setParentId] = useState(null);

  const {
    isLoading: isGetAllpropertySubCategoryIdLoading,
    isError: isGetAllpropertySubCategoryIdIsError,
    data: getAllpropertySubCategoryIdData,
    isSuccess: isGetAllpropertySubCategoryIdSuccess,
    refetch: refetchAllpropertySubCategoryId, // Add refetch function
  } = useGetQueryWithId(
    'getallPropertysubCategory',
    apiEndpoints.getAllpropertySubCategory,
    parentId,
    'parentId'
  );
  useEffect(() => {
    if (parentId) {
      refetchAllpropertySubCategoryId();
    }
  }, [parentId, refetchAllpropertySubCategoryId]);

  const options = categoryData
    ?.filter(category => !category?.isDeleted)
    .map(option => ({
      label: option.name,
      value: option?._id,
      id: option._id,
    }));

  // const subCategories =
  const subCategories =
    getAllpropertySubCategoryIdData
      ?.filter(subCategory => !subCategory?.isDeleted)
      ?.map(option => ({
        label: option.name,
        value: option?._id,
        parentId: option.parentId,
        id: option?._id,
      })) ?? [];

  const handleCategoryChange = selectedOption => {
    const selectedCategory = options.find(
      option => option.id === selectedOption.id
    );

    setSelectedCategories([selectedCategory]);
    setSelectedCategoriesName(selectedCategory.label);
    setParentId(selectedCategory.id);
    setSelectedSubCategories([]); // Clear selected sub-categories
  };

  const handleSubCategoryChange = selectedOption => {
    setSelectedSubCategories([selectedOption]);
  };

  const renderSubCategories = categoryId => {
    const filteredSubCategories = subCategories.filter(
      subCategory => subCategory.parentId === categoryId
    );

    return (
      <div>
        {filteredSubCategories.map(subCategory => {
          const isSelected = selectedSubCategories.find(
            selectedSubCategory => selectedSubCategory.id === subCategory.id
          );

          return (
            <div key={subCategory.id}>
              <input
                type="radio"
                id={subCategory.id}
                name="subcategory"
                value={subCategory.value}
                checked={isSelected}
                onChange={() => handleSubCategoryChange(subCategory)}
              />
              <label htmlFor={subCategory.id}>{subCategory.label}</label>
            </div>
          );
        })}
      </div>
    );
  };

  const handleSave = () => {
    console.log(
      'Selected categories:',
      selectedCategories.map(category => category.label).at(0)
    );
    console.log(
      'Selected subcategories:',
      selectedSubCategories.map(subCategory => subCategory.label).join(' ')
    );

    dispatch(
      setPropertyTypeString(
        selectedSubCategories
          .map(subCategory => subCategory.label)
          .join(' ')
          .toLowerCase()
      )
    );

    setPropertyFormData(prevPropertyFormData => ({
      ...prevPropertyFormData,
      propertySubTypes: selectedSubCategories.map(
        subCategory => subCategory.id
      ),
      propertyType: selectedCategories.map(category => category.id)[0],
    }));
    setShowModal(false);
  };

  const handleClose = () => setShowModal(prevShowModal => !prevShowModal);

  return (
    <>
      <Modal
        centered
        size="md"
        show={showModal}
        onHide={handleClose}
        className="confirmation-modal"
      >
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className="custom-modal-title">
            Property Type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              {options.map(option => {
                const isSelected =
                  selectedCategories && selectedCategories[0]?.id === option.id;

                return (
                  <div key={option.id}>
                    <input
                      type="radio"
                      id={option.id}
                      name="category"
                      value={option.value}
                      checked={isSelected}
                      onChange={() => handleCategoryChange(option)}
                    />
                    <label htmlFor={option.id}>{option.label}</label>
                  </div>
                );
              })}
            </div>
            {selectedCategories.length > 0 && (
              <div>
                <label>Subcategories:</label>
                {renderSubCategories(selectedCategories[0].id)}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 d-flex justify-content-start">
          <CustomButton
            handleAdd={handleSave}
            customButtonClass="custom-button-primary rounded-2 px-5"
          >
            Choose
          </CustomButton>
        </Modal.Footer>
      </Modal>
      <Col xs={6}>
        <Form.Group className="mb-4">
          <Form.Label>Property Type</Form.Label>
          <div onClick={() => setShowModal(true)}>
            <CreatableSelect
              isMulti
              options={selectedCategories.concat(selectedSubCategories)}
              value={selectedCategories.concat(selectedSubCategories)}
              isDisabled={true}
              styles={customStyles}
            />
          </div>
        </Form.Group>
      </Col>
    </>
  );
};

export default CreatableSelectWithModal;
