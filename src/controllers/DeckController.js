const { Deck } = require('../models/Deck')
const { Category } = require('../models/Category')
const { ACL } = require('../models/ACL')
const { ObjectTitles, Rights } = require('../middlewares/checkAccessRight')

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
          return res.status(201).json(deck)
        })
        .catch(err => res.status(400).json(err))
    }
  })
}

const getAll = (req, res) => {
  Deck.find({ userId: req.user.id })
    .then(decks => res.status(200).json(decks))
    .catch(err => res.status(400).json(err))
}

const getById = (req, res) => {
  Deck.findById(req.params.id)
    .then(deck => {
      res.status(200).json(deck)
    })
    .catch(err => res.status(400).json(err))
}

const update = (req, res) => {
  Deck.findByIdAndUpdate(req.params.id, req.body)
    .then(deck =>
      res
        .status(200)
        .json({ success: true, message: 'Deck updated successfully' })
    )
    .catch(err => res.status(400).json(err))
}

const remove = (req, res) => {
  Deck.findByIdAndDelete(req.params.id)
    .then(deck =>
      res.status(200).json({
        success: true,
        message: 'Deck removed successfully'
      })
    )
    .catch(err => res.status(400).json(err))
}

exports.DeckController = { create, getAll, getById, update, remove }
