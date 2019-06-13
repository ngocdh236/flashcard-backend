import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CardSchema = new Schema({
  key: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
})

const DeckSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'categories'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  cards: [CardSchema]
})

export default mongoose.model('decks', DeckSchema)
