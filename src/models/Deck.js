const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CardSchema = new Schema(
  {
    key: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

CardSchema.set('toJSON', {
  versionKey: false,
  transform: (doc, ret, options) => {
    delete ret._id
    return { id: doc._id, ...ret }
  }
})

const DeckSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    name: {
      type: String,
      required: true
    },
    cards: [CardSchema],
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'categories'
    }
  },
  { timestamps: true }
)

DeckSchema.set('toJSON', {
  versionKey: false,
  transform: (doc, ret, options) => {
    delete ret._id
    return { id: doc._id, ...ret }
  }
})

exports.Deck = mongoose.model('decks', DeckSchema)
