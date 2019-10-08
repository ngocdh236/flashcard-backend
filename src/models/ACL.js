const mongoose = require('mongoose');
const { isEmpty } = require('../utils/isEmpty');

const { Schema } = mongoose;

const ACLSchema = new Schema({
  objectTitle: { type: String, required: true },
  objectId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  rights: {
    type: [String],
    validate: rights => !isEmpty(rights)
  }
});

exports.ACL = mongoose.model('ACL', ACLSchema);
