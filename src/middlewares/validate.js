const validator = require('validator')

const validateModel = model => (req, res, next) => {
  const { errors, isValid } = model(req.body)
  if (!isValid) return res.status(400).json(errors)
  next()
}

const isEmpty = value =>
  value === undefined ||
  value === null ||
  value.length === 0 ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

const RegisterInput = data => {
  let errors = {}
  const { name, email, password } = data

  if (!validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters'
  }

  if (validator.isEmpty(name)) {
    errors.name = 'Name is required'
  }

  if (!validator.isEmail(email)) {
    errors.email = 'Email is invalid'
  }

  if (validator.isEmpty(email)) {
    errors.email = 'Email is required'
  }

  if (!validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters'
  }

  if (validator.isEmpty(password)) {
    errors.password = 'Password is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

const LoginInput = data => {
  let errors = {}
  var { email, password } = data

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is required'
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

const CategoryInput = data => {
  let errors = {}
  const { name } = data

  if (validator.isEmpty(name)) {
    errors.name = 'Name is required'
  }

  return { errors, isValid: isEmpty(errors) }
}

const DeckInput = data => {
  let errors = {}
  const { name } = data

  if (validator.isEmpty(name)) {
    errors.name = 'Name is required'
  }

  return { errors, isValid: isEmpty(errors) }
}

const CardInput = data => {
  let errors = {}
  const { key, value } = data

  if (validator.isEmpty(key)) {
    errors.key = 'Key is required'
  }

  if (validator.isEmpty(value)) {
    errors.value = 'Value is required'
  }

  return { errors, isValid: isEmpty(errors) }
}

module.exports = {
  validateModel,
  isEmpty,
  RegisterInput,
  LoginInput,
  CategoryInput,
  DeckInput,
  CardInput
}
