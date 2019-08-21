const mongoose = require('mongoose')
const isEmpty = require('../middlewares/validate')

const { Schema } = mongoose

const ACLSchema = new Schema({
  objectTitle: { type: String, required: true },
  objectId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  rights: {
    type: [String],
    validate: rights => !isEmpty(rights)
  }
})

const ACL = mongoose.model('ACL', ACLSchema)

module.exports = Authority
