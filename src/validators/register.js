const validator = require('validator')

const { isEmpty } = require('./isEmpty')

exports.validateRegisterInput = data => {
  let errors = {}

  const name = !isEmpty(data.name) ? data.name : ''
  const email = !isEmpty(data.email) ? data.email : ''
  const password = !isEmpty(data.password) ? data.password : ''

  if (!validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters'
  }

  if (validator.isEmpty(name)) {
    errors.name = 'Name is required'
  }

  if (validator.isEmpty(email)) {
    errors.email = 'Email is required'
  }

  if (!validator.isEmail(email)) {
    errors.email = 'Email is invalid'
  }

  if (validator.isEmpty(password)) {
    errors.password = 'Password is required'
  }

  if (!validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
