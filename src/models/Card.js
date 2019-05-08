import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CardSchema = Schema({
  key: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  collectionId: {
    type: Schema.Types.ObjectId,
    ref: 'collections'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

export default mongoose.model('cards', CardSchema)
