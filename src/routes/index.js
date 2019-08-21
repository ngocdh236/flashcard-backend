const express = require('express')
const passport = require('passport')

const {
  validateModelInput,
  Register,
  Login,
  UpdateUser,
  ChangeUserPassword,
  Category,
  Deck,
  Card
} = require('../middlewares/validateInput')
const { UserController } = require('../controllers/UserController')
const { CategoryController } = require('../controllers/CategoryController')
const { DeckController } = require('../controllers/DeckController')
const { CardController } = require('../controllers/CardController')

const router = express.Router()
const passportJwt = passport.authenticate('jwt', { session: false })

// USERS
const usersUrl = '/users'

router.post(
  `${usersUrl}/register`,
  validateModelInput(Register),
  UserController.register
)
router.post(
  `${usersUrl}/login`,
  validateModelInput(Login),
  UserController.login
)
router.put(
  usersUrl,
  passportJwt,
  validateModelInput(UpdateUser),
  UserController.update
)
router.patch(
  `${usersUrl}/password`,
  passportJwt,
  validateModelInput(ChangeUserPassword),
  UserController.changePassword
)
router.delete(usersUrl, passportJwt, UserController.remove)

// CATEGORIES
const categoriesUrl = '/categories'

router.post(
  categoriesUrl,
  passportJwt,
  validateModelInput(Category),
  CategoryController.create
)
router.get(categoriesUrl, passportJwt, CategoryController.getAll)
router.get(`${categoriesUrl}/:id`, passportJwt, CategoryController.getById)
router.put(
  `${categoriesUrl}/:id`,
  passportJwt,
  validateModelInput(Category),
  CategoryController.update
)
router.delete(`${categoriesUrl}/:id`, passportJwt, CategoryController.remove)

// DECKS
const decksUrl = '/decks'

router.post(
  decksUrl,
  passportJwt,
  validateModelInput(Deck),
  DeckController.create
)
router.get(decksUrl, passportJwt, DeckController.getAll)
router.put(
  `${decksUrl}/:id`,
  passportJwt,
  validateModelInput(Deck),
  DeckController.update
)
router.delete(`${decksUrl}/:id`, passportJwt, DeckController.remove)

// CARDS
const cardsUrl = '/decks/:deckId/cards'

router.post(
  cardsUrl,
  passportJwt,
  validateModelInput(Card),
  CardController.create
)
router.put(
  `${cardsUrl}/:cardId`,
  passportJwt,
  validateModelInput(Card),
  CardController.update
)
router.delete(`${cardsUrl}/:cardId`, passportJwt, CardController.remove)

exports.router = router
