import express from 'express'
import passport from 'passport'

import usersController from './UsersController'
import categoriesController from './CategoriesController'
import decksController from './DecksController'
import cardsController from './CardsController'

const router = express.Router()

// USERS
const usersUrl = '/users'

router.post(`${usersUrl}/register`, usersController.register)
router.post(`${usersUrl}/login`, usersController.login)
router.delete(
  `${usersUrl}/:id`,
  passport.authenticate('jwt', { session: false }),
  usersController.delete
)

// CATEGORIES
const categoriesUrl = '/categories'

router.post(
  categoriesUrl,
  passport.authenticate('jwt', { session: false }),
  categoriesController.create
)
router.get(
  categoriesUrl,
  passport.authenticate('jwt', { session: false }),
  categoriesController.getAll
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

router.post(
  decksUrl,
  passport.authenticate('jwt', { session: false }),
  decksController.create
)
router.get(
  decksUrl,
  passport.authenticate('jwt', { session: false }),
  decksController.getAll
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

// CARDS
const cardsUrl = '/cards'

router.post(
  cardsUrl,
  passport.authenticate('jwt', { session: false }),
  cardsController.create
)
router.get(
  cardsUrl,
  passport.authenticate('jwt', { session: false }),
  cardsController.getAll
)
router.put(
  `${cardsUrl}/:id`,
  passport.authenticate('jwt', { session: false }),
  cardsController.update
)
router.delete(
  `${cardsUrl}/:id`,
  passport.authenticate('jwt', { session: false }),
  cardsController.delete
)

export default router
