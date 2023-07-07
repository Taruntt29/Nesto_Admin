export const validateFormInput = (value, regexPattern) => {
  const regex = regexPattern;
  return regex.test(value);
};

export const formValuesValidator = formValues =>
  Object.values(formValues).every(value => {
    if (Array.isArray(value)) {
      return value.length > 0;
    } else {
      return !!value;
    }
  });
