const { ACL } = require('../models/ACL')
const { isEmpty } = require('../utils/isEmpty')

const ObjectTitles = Object.freeze({
  CATEGORY: 'Category',
  DECK: 'Deck',
  CARD: 'Card'
})

const Rights = Object.freeze({
  CREATE_CARD: 'create_card',
  GET: 'get',
  UPDATE: 'update',
  REMOVE: 'remove'
})

const checkAccessRight = (objectTitle, action) => (req, res, next) => {
  const userId = req.user.id
  const { id, deckId } = req.params

  let objectId = {}

  if (deckId) {
    objectId = deckId
  } else {
    objectId = req.body.id || id
  }

  ACL.find({ objectTitle, objectId }).then(queries => {
    if (isEmpty(queries))
      return res.status(404).json({ error: `${objectTitle} not found` })

    queries.forEach(query => {
      if (query.userId.toString() === userId && query.rights.includes(action)) {
        next()
      } else {
        return res.status(403).json({ error: 'Access denied' })
      }
    })
  })
}

module.exports = { ObjectTitles, Rights, checkAccessRight }
