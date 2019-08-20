const validator = require('validator')
const { isEmpty } = require('../utils/isEmpty')

const validateModel = model => (req, res, next) => {
  const { errors, isValid } = model(req.body)
  if (!isValid) return res.status(400).json(errors)
  next()
}

const RegisterInput = data => {
  let errors = {}

  const email = data.email ? data.email : ''
  const name = data.name ? data.name : ''
  const password = data.password ? data.password : ''

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

  const email = data.email ? data.email : ''
  const password = data.password ? data.password : ''

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

const UpdateUserInput = data => {
  let errors = {}

  const email = data.email ? data.email : ''
  const name = data.name ? data.name : ''

  if (!validator.isEmail(email)) {
    errors.email = 'Email is invalid'
  }

  if (validator.isEmpty(email)) {
    errors.email = 'Email is required'
  }

  if (!validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters'
  }

  if (validator.isEmpty(name)) {
    errors.name = 'Name is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

const ChangeUserPasswordInput = data => {
  let errors = {}

  const password = data.password ? data.password : ''

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

const CategoryInput = data => {
  let errors = {}

  const name = data.name ? data.name : ''

  if (validator.isEmpty(name)) {
    errors.name = 'Name is required'
  }

  return { errors, isValid: isEmpty(errors) }
}

const DeckInput = data => {
  let errors = {}

  const name = data.name ? data.name : ''

  if (validator.isEmpty(name)) {
    errors.name = 'Name is required'
  }

  return { errors, isValid: isEmpty(errors) }
}

const CardInput = data => {
  let errors = {}

  const key = data.key ? data.key : ''
  const value = data.value ? data.value : ''

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
  RegisterInput,
  LoginInput,
  UpdateUserInput,
  ChangeUserPasswordInput,
  CategoryInput,
  DeckInput,
  CardInput
}
