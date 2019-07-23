const { Category } = require('../models/Category')
const { Deck } = require('../models/Deck')
const { validateCategoryInput } = require('../validators/category')

const getAll = (req, res) => {
  Category.find({ userId: req.user.id })
    .then(categories => {
      res.json(categories)
    })
    .catch(err => res.json(err))
}

const create = (req, res) => {
  const { errors, isValid } = validateCategoryInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  Category.findOne({
    name: req.body.name,
    userId: req.user.id
  }).then(category => {
    if (category) {
      errors.name = 'Category already exists'
      return res.status(400).json(errors)
    } else {
      const category = new Category({
        name: req.body.name,
        userId: req.user.id
      })
      category
        .save()
        .then(category => res.json(category))
        .catch(err => res.json(err))
    }
  })
}

const update = (req, res) => {
  const { errors, isValid } = validateCategoryInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

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

exports.CategoryController = { create, getAll, update, remove }
