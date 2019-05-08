import express from 'express'
import passport from 'passport'

import usersController from './UsersController'
import categoriesController from './CategoriesController'
import collectionsController from './CollectionsController'

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

// COLLECTIONS
const collectionsUrl = '/collections'

router.get(
  `${collectionsUrl}/`,
  passport.authenticate('jwt', { session: false }),
  collectionsController.getAll
)
router.post(
  `${collectionsUrl}/`,
  passport.authenticate('jwt', { session: false }),
  collectionsController.create
)
router.put(
  `${collectionsUrl}/:id`,
  passport.authenticate('jwt', { session: false }),
  collectionsController.update
)
router.delete(
  `${collectionsUrl}/:id`,
  passport.authenticate('jwt', { session: false }),
  collectionsController.delete
)

export default router
