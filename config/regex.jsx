export const EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
export const NUMBER_TEXT_REGEX = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/;
export const NUMERIC_VALUE_REGEX = /^\d+$/;
const VALID_LARegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
export const latitudeRegex = /^-?[0-9]{1,2}(?:\.[0-9]+)?/;

export const regexValidation = {
  namePattern: /^[a-zA-Z ]{2,40}$/,
  emailPattern:
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  numberPattern: /^[0]?[6789]\d{9}$/,
  passwordPattern:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  panPattern: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
  gstPattern: /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/,
  bankAccountNumberPattern: /^[0-9]{9,18}$/,
  ifscPattern: /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/,
  numericPattern: /^\d+$/,
  subscriptionsPattern: /^\d+(\.\d{2})?$/,
  percentagePattern: /^(?:100(?:\.0{1,2})?|\d{1,2}(?:\.\d{1,2})?)$/,
  alphaNumericPattern: /^[a-zA-Z0-9]+$/,
  addressLocationPattern: /^[a-zA-Z0-9\s\-',.#()]+$/,
  latitudePattern: /^[-+]?([1-8]?\d(?:\.\d+)?|90(?:\.0+)?)$/,
  longitudePattern: /^[-+]?([1]?[0-9]{1,2}(?:\.\d+)?|180(?:\.0+)?)$/,
  textPattern: /.*/,
  discountPattern: /^([A-Za-z0-9%&\s]+|\d+%?)$/,
  alphaNumericPatternNew: /^[a-zA-Z0-9\s]+$/,
};
