const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

exports.Category = mongoose.model('categories', CategorySchema)
