require('dotenv').config()

const keysDev = {
  mongoURI: process.env.MONGO_URI_DEV,
  secretOrKey: process.env.SECRET_OR_KEY_DEV
}

const keysProd = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY
}

exports.keys = process.env.NODE_ENV === 'production' ? keysProd : keysDev
