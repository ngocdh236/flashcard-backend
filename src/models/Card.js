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
  deckId: {
    type: Schema.Types.ObjectId,
    ref: 'decks'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

export default mongoose.model('cards', CardSchema)
