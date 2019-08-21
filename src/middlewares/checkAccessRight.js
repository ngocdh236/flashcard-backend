/* eslint-disable eqeqeq */
const ACL = require('../models/ACL')
const { isEmpty } = require('../utils/isEmpty')

const ObjectTitle = Object.freeze({
  CATEGORY: 'Category',
  DECK: 'Deck',
  CARD: 'Card'
})

const Rights = Object.freeze({
  CREATE: 'create',
  GET: 'get',
  UPDATE: 'update',
  REMOVE: 'remove'
})

const checkAccessRight = (objectTitle, action) => (req, res, next) => {
  const userId = req.user.id
  const objectId = req.body.id || req.params.id

  ACL.find({ objectTitle, objectId }).then(queries => {
    if (isEmpty(queries))
      return res.status(404).json({ error: `${objectTitle} not found` })

    queries.forEach(query => {
      if (query.userId == userId && query.rights.includes(action)) {
        next()
      } else {
        return res.status(401).json({ error: 'Unauthorized' })
      }
    })
  })
}

module.exports = { ObjectTitle, Rights, checkAccessRight }
