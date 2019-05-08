import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CategorySchema = Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

export default mongoose.model('categories', CategorySchema)
