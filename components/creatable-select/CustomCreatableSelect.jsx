import { useState } from 'react';
import { Form } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { customStyles } from '../../data/Constant';
import './CustomCreatableSelect.css';

const CustomCreatableSelect = ({
  placeholder = 'Add More',
  label,
  data,
  type = 'default',
  defaultOption = [],
  name,
  setPropertyFormData,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = selectedOptions => {
    const selectedValues = selectedOptions.map(option => option.value);
    setSelectedOptions(selectedOptions);
    console.log(selectedValues);
    setPropertyFormData(prevFormData => ({
      ...prevFormData,
      [name]: selectedValues,
    }));
  };

  const getOptions = () => {
    switch (type) {
      case 'specification':
        return data
          ?.filter(item => !item?.isDeleted)
          .map(option => ({
            label: option.name,
            value: {
              name: option.name,
            },
          }));
      case 'furnishing':
        return data
          ?.filter(item => !item?.isDeleted)
          .map(option => ({
            label: `${option.name} ${option.furnishingQuantity}`,
            value: `${option.name} ${option.furnishingQuantity}`,
          }));
      case 'bank':
      case 'property':
      case 'loan':
        return data
          ?.filter(item => !item?.isDeleted)
          .map(option => ({
            label: option.name,
            value: option?._id,
          }));
      case 'propertyType':
        return data
          ?.filter(item => !item?.isDeleted)
          .map(option => ({
            label: option.name,
            value: option?._id,
          }));
      case 'nearby':
        return data
          ?.filter(item => !item?.isDeleted)
          .map(option => ({
            label: `${option?.name}, ${option?.location}, ${option?.distance}`,
            // value: `${option?.name}. ${option?.location}, ${option?.distance}`,
            value: option?._id,
          }));
      case 'amenity':
        return data
          ?.filter(item => !item?.isDeleted)
          .map(option => ({
            label: `${option?.quantity} ${option?.name}`,
            // value: `${option?.quantity}. ${option?.name}`,
            value: option?._id,
          }));
      case 'location':
        return data
          ?.filter(item => !item?.isDeleted)
          .map(option => ({
            label: `${option?.name}, ${option?.distance}`,
            // value: `${option?.name} ${option?.distance}`,
            value: option?._id,
          }));
      default:
        return defaultOption;
    }
  };

  const options = getOptions();

  return (
    <Form.Group className="mb-4">
      <Form.Label>{label}</Form.Label>
      <CreatableSelect
        isMulti
        placeholder={placeholder}
        options={options}
        value={selectedOptions}
        onChange={handleSelectChange}
        name={name}
        styles={customStyles}
      />
    </Form.Group>
  );
};

export default CustomCreatableSelect;
