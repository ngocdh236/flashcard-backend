const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

CategorySchema.set('toJSON', {
  versionKey: false,
  transform: (doc, ret, options) => {
    delete ret._id;
    return { id: doc._id, ...ret };
  }
});

exports.Category = mongoose.model('categories', CategorySchema);
