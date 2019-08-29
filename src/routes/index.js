const express = require('express')
const passport = require('passport')

const { UserController } = require('../controllers/UserController')
const { CategoryController } = require('../controllers/CategoryController')
const { DeckController } = require('../controllers/DeckController')
const { CardController } = require('../controllers/CardController')
const {
  checkAccessRight,
  ObjectTitles,
  Rights
} = require('../middlewares/checkAccessRight')
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
router.get(
  `${categoriesUrl}/:id`,
  passportJwt,
  checkAccessRight(ObjectTitles.CATEGORY, Rights.GET),
  CategoryController.getById
)
router.put(
  categoriesUrl,
  passportJwt,
  checkAccessRight(ObjectTitles.CATEGORY, Rights.UPDATE),
  validateModelInput(Category),
  CategoryController.update
)
router.delete(
  `${categoriesUrl}/:id`,
  passportJwt,
  checkAccessRight(ObjectTitles.CATEGORY, Rights.REMOVE),
  CategoryController.remove
)

// DECKS
const decksUrl = '/decks'

router.post(
  decksUrl,
  passportJwt,
  validateModelInput(Deck),
  DeckController.create
)
router.get(decksUrl, passportJwt, DeckController.getAll)
router.get(
  `${decksUrl}/:id`,
  passportJwt,
  checkAccessRight(ObjectTitles.DECK, Rights.GET),
  DeckController.getById
)
router.put(
  decksUrl,
  passportJwt,
  checkAccessRight(ObjectTitles.DECK, Rights.UPDATE),
  validateModelInput(Deck),
  DeckController.update
)
router.delete(
  `${decksUrl}/:id`,
  passportJwt,
  checkAccessRight(ObjectTitles.DECK, Rights.REMOVE),
  DeckController.remove
)

// CARDS
const cardsUrl = '/decks/:deckId/cards'

router.post(
  cardsUrl,
  passportJwt,
  checkAccessRight(ObjectTitles.DECK, Rights.CREATE_CARD),
  validateModelInput(Card),
  CardController.create
)
router.put(
  cardsUrl,
  passportJwt,
  checkAccessRight(ObjectTitles.DECK, Rights.UPDATE),
  validateModelInput(Card),
  CardController.update
)
router.delete(
  `${cardsUrl}/:cardId`,
  passportJwt,
  checkAccessRight(ObjectTitles.DECK, Rights.REMOVE),
  CardController.remove
)

exports.router = router
