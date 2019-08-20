const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  }
})

exports.Category = mongoose.model('categories', CategorySchema)
