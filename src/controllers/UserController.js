const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { keys } = require('../config/keys')
const { User } = require('../models/User')
const { Category } = require('../models/Category')
const { Deck } = require('../models/Deck')
const { validateRegisterInput } = require('../validators/register')
const { validateLoginInput } = require('../validators/login')

const register = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists'
      return res.status(400).json(errors)
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err
          user.password = hash
          user
            .save()
            .then(user => res.json(user))
            .catch(err => res.json(err))
        })
      })
    }
  })
}

const login = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found'
      return res.status(404).json(errors)
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, email: user.email }

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          }
        )
      } else {
        errors.password = 'Password incorrect'
        return res.status(400).json(errors)
      }
    })
  })
}

const remove = (req, res) => {
  Deck.deleteMany({ userId: req.user.id })
    .then(
      Category.deleteMany({ userId: req.user.id })
        .then(res =>
          User.findByIdAndDelete(req.user.id)
            .then(res => res.json({ success: true }))
            .catch(err => res.json(err))
        )
        .catch(err => res.json(err))
    )
    .catch(err => res.json(err))
}

exports.UserController = { register, login, remove }
