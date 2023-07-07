import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { customStyles } from '../../../data/Constant';

const CustomCreatableSelectModal = ({ label, data }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);

  const handleCheckboxChange = value => {
    // Check if the value is already selected
    const index = selectedValues.indexOf(value);
    if (index === -1) {
      // If not selected, add to the selected values
      setSelectedValues([...selectedValues, value]);
    } else {
      // If already selected, remove from the selected values
      setSelectedValues(selectedValues?.filter(val => val !== value));
    }
  };

  const handleSaveClick = () => {
    // Hide the modal and update the Property Type creatable select
    setShowModal(false);
    const options = selectedValues.map(value => ({ label: value, value }));
    setSelectedValues(options);
  };

  const handleCancelClick = () => {
    // Hide the modal and reset the selected values
    setShowModal(false);
    setSelectedValues([]);
  };

  const handleSelectChange = selectedValues => {
    setSelectedValues(selectedValues);
  };

  const getOptions = () => {
    return data.map(option => ({
      label: option.name,
      value: option.name,
    }));
  };

  const options = getOptions();

  return (
    <>
      <Form.Group className="mb-4">
        <Form.Label>{label}</Form.Label>
        <CreatableSelect
          isMulti
          placeholder="Property Type"
          options={options}
          value={selectedValues}
          onChange={handleSelectChange}
          styles={customStyles}
          // isClearable
          backspaceRemovesValue={true}
          isDisabled={true}
        />
        <Button onClick={() => setShowModal(true)}>Add More</Button>
      </Form.Group>
      <Modal show={showModal} onHide={handleCancelClick}>
        <Modal.Header closeButton>
          <Modal.Title>Add Property Types</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data.map(option => (
            <Form.Check
              key={option.name}
              type="checkbox"
              label={option.name}
              checked={selectedValues.includes(option.name)}
              onChange={() => handleCheckboxChange(option.name)}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveClick}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomCreatableSelectModal;
