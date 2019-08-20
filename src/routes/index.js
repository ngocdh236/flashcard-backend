const express = require('express')
const passport = require('passport')

const {
  validateModel,
  RegisterInput,
  LoginInput,
  CategoryInput,
  DeckInput,
  CardInput
} = require('../middlewares/validate')
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
  validateModel(RegisterInput),
  UserController.register
)
router.post(
  `${usersUrl}/login`,
  validateModel(LoginInput),
  UserController.login
)
router.delete(
  usersUrl,
  passport.authenticate('jwt', { session: false }),
  UserController.remove
)

// CATEGORIES
const categoriesUrl = '/categories'

router.post(
  categoriesUrl,
  passportJwt,
  validateModel(CategoryInput),
  CategoryController.create
)
router.get(categoriesUrl, passportJwt, CategoryController.getAll)
router.put(
  `${categoriesUrl}/:id`,
  passportJwt,
  validateModel(CategoryInput),
  CategoryController.update
)
router.delete(`${categoriesUrl}/:id`, passportJwt, CategoryController.remove)

// DECKS
const decksUrl = '/decks'

router.post(
  decksUrl,
  passportJwt,
  validateModel(DeckInput),
  DeckController.create
)
router.get(decksUrl, passportJwt, DeckController.getAll)
router.put(
  `${decksUrl}/:id`,
  passportJwt,
  validateModel(DeckInput),
  DeckController.update
)
router.delete(`${decksUrl}/:id`, passportJwt, DeckController.remove)

// CARDS
const cardsUrl = '/decks/:deckId/cards'

router.post(
  cardsUrl,
  passportJwt,
  validateModel(CardInput),
  CardController.create
)
router.put(
  `${cardsUrl}/:cardId`,
  passportJwt,
  validateModel(CardInput),
  CardController.update
)
router.delete(`${cardsUrl}/:cardId`, passportJwt, CardController.remove)

exports.router = router
