import { Strategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import passport from 'passport'

import keys from './keys'
import User from '../models/User'

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

passport.use(
  new Strategy(opts, (jwt_payload, done) => {
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

const appPassport = passport.initialize()

export default appPassport
