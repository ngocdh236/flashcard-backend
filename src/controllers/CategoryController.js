const { Category } = require('../models/Category')
const { Deck } = require('../models/Deck')
const { ACL } = require('../models/ACL')
const { ObjectTitles, Rights } = require('../middlewares/checkAccessRight')

const create = (req, res) => {
  let errors = {}
  const { name } = req.body
  const userId = req.user.id
  Category.findOne({
    name,
    userId
  }).then(category => {
    if (category) {
      errors.name = 'Category already exists'
      return res.status(400).json(errors)
    }
    Category.create({
      name,
      userId
    })
      .then(async category => {
        await ACL.create({
          objectTitle: ObjectTitles.CATEGORY,
          objectId: category.id,
          userId,
          rights: [Rights.GET, Rights.CREATE_DECK, Rights.UPDATE, Rights.REMOVE]
        })
        return res.status(201).json(category)
      })
      .catch(err => res.json(err))
  })
}

const getAll = (req, res) => {
  Category.find({ userId: req.user.id })
    .then(categories => {
      res.json(categories)
    })
    .catch(err => res.json(err))
}

const getById = (req, res) => {
  Category.findById(req.params.id).then(category => {
    res.status(200).json(category)
  })
}

const update = (req, res) => {
  Category.findByIdAndUpdate(req.params.id, req.body)
    .then(response =>
      Category.findById(req.params.id)
        .then(category => res.json(category))
        .catch(err => res.json(err))
    )
    .catch(err => res.json(err))
}

const remove = (req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then(category =>
      Deck.updateMany({ categoryId: category.id }, { categoryId: null })
        .then(response => res.json({ success: true }))
        .catch(err =>
          res.json({
            success: true,
            decksRemovingRefErrors: err
          })
        )
    )
    .catch(err => res.json(err))
}

exports.CategoryController = { create, getAll, getById, update, remove }
