const validator = require('validator')

const { isEmpty } = require('./isEmpty')

exports.validateDeckInput = data => {
  let errors = {}

  const name = !isEmpty(data.name) ? data.name : ''

  if (validator.isEmpty(name)) {
    errors.name = 'Name is required'
  }

  return { errors, isValid: isEmpty(errors) }
}
