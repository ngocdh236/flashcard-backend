const { Category } = require('../models/Category');
const { Deck } = require('../models/Deck');
const { ACL } = require('../models/ACL');
const { ObjectTitles, Rights } = require('../middlewares/checkAccessRight');

const create = (req, res) => {
  let errors = {};
  const { name } = req.body;
  const userId = req.user.id;
  Category.findOne({
    name,
    userId
  }).then(category => {
    if (category) {
      errors.name = 'Category already exists';
      return res.status(400).json(errors);
    }
    Category.create({
      name,
      userId
    })
      .then(async category => {
        await ACL.create({
          objectTitle: ObjectTitles.CATEGORY,
          objectId: category.id,
          userId,
          rights: [Rights.GET, Rights.CREATE_DECK, Rights.UPDATE, Rights.REMOVE]
        });
        return res.status(201).json(category);
      })
      .catch(err => res.status(400).json(err));
  });
};

const getAll = (req, res) => {
  Category.find({ userId: req.user.id })
    .then(categories => {
      res.status(200).json(categories);
    })
    .catch(err => res.status(400).json(err));
};

const getById = (req, res) => {
  Category.findById(req.params.id)
    .then(category => {
      res.status(200).json(category);
    })
    .catch(err => res.status(400).json(err));
};

const update = (req, res) => {
  const { id, name } = req.body;
  Category.findByIdAndUpdate(id, { name })
    .then(
      res
        .status(200)
        .json({ success: true, message: 'Category updated successfully' })
    )
    .catch(err => res.status(400).json(err));
};

const remove = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id)
    .then(response =>
      res
        .status(200)
        .json({ success: true, message: 'Category removed successfully' })
    )
    .catch(err => res.status(400).json(err));
  await Deck.updateMany({ categoryId: category.id }, { categoryId: null });
};

exports.CategoryController = { create, getAll, getById, update, remove };
