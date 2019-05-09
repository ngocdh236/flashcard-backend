import express from 'express'
import passport from 'passport'

import usersController from './UsersController'
import categoriesController from './CategoriesController'
import decksController from './DecksController'

const router = express.Router()

// USERS
const usersUrl = '/users'

router.post(`${usersUrl}/register`, usersController.register)
router.post(`${usersUrl}/login`, usersController.login)

// CATEGORIES
const categoriesUrl = '/categories'

router.get(
  `${categoriesUrl}/`,
  passport.authenticate('jwt', { session: false }),
  categoriesController.getAll
)
router.post(
  `${categoriesUrl}/`,
  passport.authenticate('jwt', { session: false }),
  categoriesController.create
)
router.put(
  `${categoriesUrl}/:id`,
  passport.authenticate('jwt', { session: false }),
  categoriesController.update
)
router.delete(
  `${categoriesUrl}/:id`,
  passport.authenticate('jwt', { session: false }),
  categoriesController.delete
)

// DECKS
const decksUrl = '/decks'

router.get(
  `${decksUrl}/`,
  passport.authenticate('jwt', { session: false }),
  decksController.getAll
)
router.post(
  `${decksUrl}/`,
  passport.authenticate('jwt', { session: false }),
  decksController.create
)
router.put(
  `${decksUrl}/:id`,
  passport.authenticate('jwt', { session: false }),
  decksController.update
)
router.delete(
  `${decksUrl}/:id`,
  passport.authenticate('jwt', { session: false }),
  decksController.delete
)

export default router
