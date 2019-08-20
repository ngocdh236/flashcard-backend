const { Deck } = require('../models/Deck')

const getAll = (req, res) => {
  Deck.find({ userId: req.user.id })
    .then(decks => res.json(decks))
    .catch(err => res.json(err))
}

const create = (req, res) => {
  let errors = {}
  Deck.findOne({ name: req.body.name, userId: req.user.id }).then(deck => {
    if (deck) {
      errors.name = 'Deck already exists'
      return res.status(400).json(errors)
    } else {
      const deck = new Deck({
        name: req.body.name,
        userId: req.user.id,
        categoryId: req.body.categoryId ? req.body.categoryId : null
      })
      deck
        .save()
        .then(deck => res.json(deck))
        .catch(err => res.json(err))
    }
  })
}

const update = (req, res) => {
  Deck.findByIdAndUpdate(req.params.id, req.body)
    .then(response =>
      Deck.findById(req.params.id)
        .then(deck => res.json(deck))
        .catch(err => res.json(err))
    )
    .catch(err => res.json(err))
}

const remove = (req, res) => {
  Deck.findByIdAndDelete(req.params.id)
    .then(deck =>
      res.json({
        success: true
      })
    )
    .catch(err => res.json(err))
}

exports.DeckController = { create, getAll, update, remove }
