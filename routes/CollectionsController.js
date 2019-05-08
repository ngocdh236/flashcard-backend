import Collection from '../../models/Collection'
import validateCollectionInput from '../validators/collection'

class CollectionsController {
  getAll(req, res) {
    Collection.find({ userId: req.user.id })
      .then(collections => res.json(collections))
      .catch(err => res.json(err))
  }

  create(req, res) {
    const { errors, isValid } = validateCollectionInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    Collection.findOne({ name: req.body.name }).then(collection => {
      if (collection) {
        errors.name = 'Collection already exists'
        return res.status(400).json(errors)
      } else {
        const collection = new Collection({
          name: req.body.name,
          userId: req.user.id,
          categoryId: req.body.categoryId ? req.body.categoryId : null
        })
        collection
          .save()
          .then(collection => res.json(collection))
          .catch(err => res.json(err))
      }
    })
  }

  update(req, res) {
    const { errors, isValid } = validateCollectionInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }

    Collection.findByIdAndUpdate(req.body.id, req.body)
      .then(response =>
        Collection.findById(req.body.id)
          .then(collection => res.json(collection))
          .catch(err => res.json(err))
      )
      .catch(err => res.json(err))
  }

  delete(req, res) {
    Collection.findByIdAndDelete(req.params.id)
      .then(response => res.json({ success: true }))
      .catch(err => res.json(err))
  }
}

export default new CollectionsController()
