  const camelToWords = (fieldName) => {
    const result = fieldName.replace(/([A-Z])/g, ' $1');
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult
  }

export default function fieldValidators() {

  const isEmpty = (fieldName, fieldValue) => {
    return !fieldValue ? 'The ' + camelToWords(fieldName) + ' field is required' : '';
  };
  const minLength = (fieldName, fieldValue, min) => {
    return fieldValue.length < min
      ? `The ${camelToWords(fieldName)} field must be at least ${min} characters long`
      : '';
  };
  const isNum = (fieldName, fieldValue) => {
    let isNum = /^\d+$/.test(fieldValue);
    return !isNum ? 'The ' + fieldName + ' field only have numbers' : '';
  };
  const isEmail = (fieldName, fieldValue) => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(fieldValue)
      ? 'The input is not a valid ' + fieldName + ' address'
      : '';
  };

  return { isEmpty, minLength, isEmail, isNum };
}
