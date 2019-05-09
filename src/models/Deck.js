import mongoose from 'mongoose'

const Schema = mongoose.Schema

const DeckSchema = Schema({
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
