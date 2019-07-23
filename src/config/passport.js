const { Strategy } = require('passport-jwt')
const { ExtractJwt } = require('passport-jwt')
const passport = require('passport')

const { keys } = require('./keys')
const { User } = require('../models/User')

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = keys.secretOrKey

passport.use(
  new Strategy(options, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      })
      .catch(err => console.log(err))
  })
)

exports.passport = passport.initialize()
