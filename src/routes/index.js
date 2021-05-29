const express = require("express");
const passport = require("passport");

const { UserController } = require("../controllers/user.controller");
const { CategoryController } = require("../controllers/category.controller");
const { DeckController } = require("../controllers/deck.controller");

const {
  checkAccessRight,
  ObjectTitles,
  Rights,
} = require("../middlewares/checkAccessRight");
const {
  validateInputModel,
  Register,
  Login,
  UpdateUser,
  ChangeUserPassword,
  Category,
  Deck,
  Card,
} = require("../middlewares/validateInput");

const router = express.Router();
const passportJwt = passport.authenticate("jwt", { session: false });

// USERS
const usersUrl = "/users";

router.post(
  `${usersUrl}/register`,
  validateInputModel(Register),
  UserController.register
);

router.post(
  `${usersUrl}/login`,
  validateInputModel(Login),
  UserController.login
);

router.put(
  usersUrl,
  passportJwt,
  validateInputModel(UpdateUser),
  UserController.update
);

router.patch(
  `${usersUrl}/password`,
  passportJwt,
  validateInputModel(ChangeUserPassword),
  UserController.changePassword
);
router.delete(usersUrl, passportJwt, UserController.remove);

// CATEGORIES
const categoriesUrl = "/categories";

router.post(
  categoriesUrl,
  passportJwt,
  validateInputModel(Category),
  CategoryController.create
);

// Get user categories
router.get(categoriesUrl, passportJwt, CategoryController.getUserCategories);

// Get all decks
router.get(
  `${categoriesUrl}/:id/decks`,
  passportJwt,
  checkAccessRight(ObjectTitles.CATEGORY, Rights.GET),
  CategoryController.getAllDecks
);

// Get by id
router.get(
  `${categoriesUrl}/:id`,
  passportJwt,
  checkAccessRight(ObjectTitles.CATEGORY, Rights.GET),
  CategoryController.getById
);

router.put(
  categoriesUrl,
  passportJwt,
  checkAccessRight(ObjectTitles.CATEGORY, Rights.UPDATE),
  validateInputModel(Category),
  CategoryController.update
);

router.delete(
  `${categoriesUrl}/:id`,
  passportJwt,
  checkAccessRight(ObjectTitles.CATEGORY, Rights.REMOVE),
  CategoryController.remove
);

// DECKS
const decksUrl = "/decks";

router.post(
  decksUrl,
  passportJwt,
  validateInputModel(Deck),
  DeckController.create
);

// Get all
router.get(decksUrl, passportJwt, DeckController.getAll);

// Get by id
router.get(
  `${decksUrl}/:id`,
  passportJwt,
  checkAccessRight(ObjectTitles.DECK, Rights.GET),
  DeckController.getById
);

router.put(
  decksUrl,
  passportJwt,
  checkAccessRight(ObjectTitles.DECK, Rights.UPDATE),
  validateInputModel(Deck),
  DeckController.update
);

router.delete(
  `${decksUrl}/:id`,
  passportJwt,
  checkAccessRight(ObjectTitles.DECK, Rights.REMOVE),
  DeckController.remove
);

exports.router = router;
