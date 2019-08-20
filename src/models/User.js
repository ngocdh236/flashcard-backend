const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.set('toJSON', {
  versionKey: false,
  transform: (doc, ret, options) => {
    delete ret._id
    return { id: doc._id, ...ret }
  }
})

exports.User = mongoose.model('users', UserSchema)
