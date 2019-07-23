const validator = require('validator')

const { isEmpty } = require('./isEmpty')

exports.validateCardInput = data => {
  let errors = {}

  const key = !isEmpty(data.key) ? data.key : ''
  const value = !isEmpty(data.value) ? data.value : ''

  if (validator.isEmpty(key)) {
    errors.key = 'Key is required'
  }

  if (validator.isEmpty(value)) {
    errors.value = 'Value is required'
  }

  return { errors, isValid: isEmpty(errors) }
}
