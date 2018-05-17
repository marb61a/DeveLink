const Validator = require('validator');
const isEmpty = require ('./is-empty');

module.exports = function validateProfileInput(data){
  let errors = {};

  // Sets undefined values to empty strings
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  return {
    errors,
    isValid: isEmpty(errors)
  };
};