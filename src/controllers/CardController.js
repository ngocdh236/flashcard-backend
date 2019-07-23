const { Deck } = require('../models/Deck')
const { validateCardInput } = require('../validators/card')

const create = (req, res) => {
  const { errors, isValid } = validateCardInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  Deck.findById(req.params.deckId)
    .then(deck => {
      deck.cards.push(req.body)
      deck
        .save()
        .then(deck => res.json(deck))
        .catch(err => res.json(err))
    })
    .catch(err => res.json(err))
}

const update = (req, res) => {
  const { errors, isValid } = validateCardInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  Deck.findById(req.params.deckId)
    .then(deck => {
      const card = deck.cards.id(req.params.cardId)
      card.set(req.body)
      deck
        .save()
        .then(deck => res.json(deck))
        .catch(err => res.json(err))
    })
    .catch(err => res.json(err))
}

const remove = (req, res) => {
  Deck.findById(req.params.deckId)
    .then(deck => {
      deck.cards.id(req.params.cardId).remove()
      deck
        .save()
        .then(deck => res.json(deck))
        .catch(err => res.json(err))
    })
    .catch(err => res.json(err))
}

exports.CardController = { create, update, remove }
