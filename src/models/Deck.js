import mongoose from 'mongoose'
import Card from './Card'

const Schema = mongoose.Schema

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
  }
})

export default mongoose.model('decks', DeckSchema)
