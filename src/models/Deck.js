const mongoose = require('mongoose')

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
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  cards: [CardSchema],
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'categories'
  }
})

exports.Deck = mongoose.model('decks', DeckSchema)
