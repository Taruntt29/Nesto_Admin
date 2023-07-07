import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { validateFormInput } from '../../../helper/helperFunction';

const InputField = ({
  regexPattern,
  handleSetFormValues,
  validFeedback,
  invalidFeedback,
  name,
  type,
  id,
  label,
  inputFieldData,
  className,
  placeholder,
}) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = event => {
    const newValue = event.target.value;
    setValue(newValue);
    setIsValid(validateFormInput(newValue, regexPattern));
    setIsTouched(true);

    // if (isValid) {
    //   setValue(newValue);
    // }
  };

  const feedback = !value ? null : isValid ? validFeedback : invalidFeedback;

  useEffect(() => {
    if (handleSetFormValues) {
      if (isValid) {
        handleSetFormValues(name, value);
      } else {
        handleSetFormValues(name, '');
      }
    }
  }, [isValid, name, value]);

  return (
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        className={`custom-input ${className}`}
        data-input-field={inputFieldData}
        onChange={handleInputChange}
        isInvalid={!isValid && isTouched}
        isValid={isValid}
      />
      <Form.Control.Feedback type="invalid">{feedback}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default InputField;
