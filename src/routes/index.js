const express = require('express')
const passport = require('passport')

const { UserController } = require('../controllers/UserController')
const { CategoryController } = require('../controllers/CategoryController')
const { DeckController } = require('../controllers/DeckController')
const { CardController } = require('../controllers/CardController')

const router = express.Router()

// USERS
const usersUrl = '/users'

router.post(`${usersUrl}/register`, UserController.register)
router.post(`${usersUrl}/login`, UserController.login)
router.delete(
  usersUrl,
  passport.authenticate('jwt', { session: false }),
  UserController.remove
)

// CATEGORIES
const categoriesUrl = '/categories'

router.post(
  categoriesUrl,
  passport.authenticate('jwt', { session: false }),
  CategoryController.create
)
router.get(
  categoriesUrl,
  passport.authenticate('jwt', { session: false }),
  CategoryController.getAll
)
router.put(
  `${categoriesUrl}/:id`,
  passport.authenticate('jwt', { session: false }),
  CategoryController.update
)
router.delete(
  `${categoriesUrl}/:id`,
  passport.authenticate('jwt', { session: false }),
  CategoryController.remove
)

// DECKS
const decksUrl = '/decks'

router.post(
  decksUrl,
  passport.authenticate('jwt', { session: false }),
  DeckController.create
)
router.get(
  decksUrl,
  passport.authenticate('jwt', { session: false }),
  DeckController.getAll
)
router.put(
  `${decksUrl}/:id`,
  passport.authenticate('jwt', { session: false }),
  DeckController.update
)
router.delete(
  `${decksUrl}/:id`,
  passport.authenticate('jwt', { session: false }),
  DeckController.remove
)

// CARDS
const cardsUrl = '/decks/:deckId/cards'

router.post(
  cardsUrl,
  passport.authenticate('jwt', { session: false }),
  CardController.create
)
router.put(
  `${cardsUrl}/:cardId`,
  passport.authenticate('jwt', { session: false }),
  CardController.update
)
router.delete(
  `${cardsUrl}/:cardId`,
  passport.authenticate('jwt', { session: false }),
  CardController.remove
)

exports.router = router
