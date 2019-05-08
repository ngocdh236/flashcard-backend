import express from 'express'
const router = express.Router()
import passport from 'passport'

import Category from '../../models/Category'
import validateCategoryInput from '../validators/category'

class CategoriesController {
  getAll(req, res) {
    Category.find({ userId: req.user.id })
      .then(categories => res.json(categories))
      .catch(err => res.json(err))
  }

  create(req, res) {
    const { errors, isValid } = validateCategoryInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    Category.findOne({
      name: req.body.name
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

  update(req, res) {
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

  delete(req, res) {
    Category.findByIdAndDelete(req.params.id)
      .then(response => res.json({ success: true }))
      .catch(err => res.json(err))
  }
}

export default new CategoriesController()
