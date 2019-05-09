import validator from 'validator'

import isEmpty from './isEmpty'

export default function validateDeckInput(data) {
  let errors = {}

  const name = !isEmpty(data.name) ? data.name : ''

  if (validator.isEmpty(name)) {
    errors.name = 'Name is required'
  }

  return { errors, isValid: isEmpty(errors) }
}
