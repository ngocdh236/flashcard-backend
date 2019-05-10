import { Strategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import passport from 'passport'

import keys from './keys'
import User from '../models/User'

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

export default passport.initialize()
