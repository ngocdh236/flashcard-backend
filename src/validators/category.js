const validator = require('validator')

const isEmpty = require('./isEmpty')

module.exports = function validateCategoryInput(data) {
  let errors = {}

  const name = !isEmpty(data.name) ? data.name : ''

  if (validator.isEmpty(name)) {
    errors.name = 'Name is required'
  }

  return { errors, isValid: isEmpty(errors) }
}
