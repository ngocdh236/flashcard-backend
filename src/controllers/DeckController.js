const { Deck } = require('../models/Deck')
const { Category } = require('../models/Category')
const { ACL } = require('../models/ACL')
const { ObjectTitles, Rights } = require('../middlewares/checkAccessRight')

const getAll = (req, res) => {
  Deck.find({ userId: req.user.id })
    .then(decks => res.json(decks))
    .catch(err => res.json(err))
}

const create = (req, res) => {
  let errors = {}
  const userId = req.user.id
  const { name, categoryId } = req.body
  if (categoryId) {
    ACL.findOne({ objectTitle: ObjectTitles.CATEGORY, userId }).then(query => {
      if (!query) return res.status(401).json({ error: 'Unauthorized' })
    })
  }
  Deck.findOne({ name, userId }).then(deck => {
    if (deck) {
      errors.name = 'Deck already exists'
      return res.status(400).json(errors)
    } else {
      Deck.create({
        name,
        userId,
        categoryId
      })
        .then(async deck => {
          await ACL.create({
            objectTitle: ObjectTitles.DECK,
            objectId: deck.id,
            userId,
            rights: [
              Rights.GET,
              Rights.CREATE_CARD,
              Rights.UPDATE,
              Rights.REMOVE
            ]
          })
          return res.json(deck)
        })
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
