import { reactive } from '@vue/reactivity';
import fieldValidators from './Validators.js';

const error = reactive({});
const { isEmpty, minLength, isEmail } = fieldValidators();
// isNum not used

export default function FormValidations() {
  const validateFirstNameField = (fieldName, fieldValue,length) => {
    error[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue.trim())
      : minLength(fieldName, fieldValue.trim(), length);
  };
  const validateLastNameField = (fieldName, fieldValue,length) => {
    error[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue.trim())
      : minLength(fieldName, fieldValue.trim(), length);
  };

  const validateEmailField = (fieldName, fieldValue) => {
    error[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : isEmail(fieldName, fieldValue);
  };

  const validatePasswordField = (fieldName, fieldValue) => {
    error[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : minLength(fieldName, fieldValue, 8);
  };

  const validateAddressField = (fieldName, fieldValue, length) => {
    error[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : minLength(fieldName, fieldValue, length);
  };

  const validateCityField = (fieldName, fieldValue, length) => {
    error[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : minLength(fieldName, fieldValue, length);
  };

  const validatePostalCodeField = (fieldName, fieldValue, length) => {
    error[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : minLength(fieldName, fieldValue, length);
  };

  const validatePhoneField = (fieldName, fieldValue, length) => {
    error[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : minLength(fieldName, fieldValue, length);
  };

  return {
    error,
    validateFirstNameField,
    validateLastNameField,
    validateEmailField,
    validatePasswordField,
    validateAddressField,
    validateCityField,
    validatePostalCodeField,
    validatePhoneField,
  };
}
