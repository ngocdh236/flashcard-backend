const { Deck } = require('../models/Deck')

const create = (req, res) => {
  Deck.findById(req.params.deckId)
    .then(deck => {
      deck.cards.push(req.body)
      deck
        .save()
        .then(deck => res.status(201).json(deck.cards[deck.cards.length - 1]))
        .catch(err => res.status(400).json(err))
    })
    .catch(err => res.status(400).json(err))
}

const update = (req, res) => {
  Deck.findById(req.params.deckId)
    .then(deck => {
      const card = deck.cards.id(req.params.cardId)
      card.set(req.body)
      deck
        .save()
        .then(deck =>
          res
            .status(200)
            .json({ success: true, message: 'Card updated successfully' })
        )
        .catch(err => res.status(400).json(err))
    })
    .catch(err => res.status(400).json(err))
}

const remove = (req, res) => {
  Deck.findById(req.params.deckId)
    .then(deck => {
      deck.cards.id(req.params.cardId).remove()
      deck
        .save()
        .then(deck =>
          res
            .status(200)
            .json({ success: true, message: 'Card removed successfully' })
        )
        .catch(err => res.status(400).json(err))
    })
    .catch(err => res.status(400).json(err))
}

exports.CardController = { create, update, remove }
