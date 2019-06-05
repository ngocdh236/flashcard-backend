import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import keys from '../config/keys'
import User from '../models/User'
import Category from '../models/Category'
import Deck from '../models/Deck'
import Card from '../models/Card'
import validateRegisterInput from '../validators/register'
import validateLoginInput from '../validators/login'

class UsersController {
  register(req, res) {
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

  login(req, res) {
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

  delete(req, res) {
    User.findByIdAndDelete(req.params.id)
      .then(user => {
        Card.deleteMany({ userId: user.id })
          .then(response =>
            Deck.deleteMany({ userId: user.id })
              .then(response =>
                Category.deleteMany({ userId: user.id })
                  .then(response => res.json({ success: true }))
                  .catch(err => res.json(err))
              )
              .catch(err => res.json(err))
          )
          .catch(err => res.json(err))
      })
      .catch(err => res.json(err))
  }
}

export default new UsersController()
