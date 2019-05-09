import Deck from '../models/Deck'
import validateDeckInput from '../validators/deck'

class DecksController {
  getAll(req, res) {
    Deck.find({ userId: req.user.id })
      .then(decks => res.json(decks))
      .catch(err => res.json(err))
  }

  create(req, res) {
    const { errors, isValid } = validateDeckInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    Deck.findOne({ name: req.body.name }).then(deck => {
      if (deck) {
        errors.name = 'Deck already exists'
        return res.status(400).json(errors)
      } else {
        const deck = new Deck({
          name: req.body.name,
          userId: req.user.id,
          categoryId: req.body.categoryId ? req.body.categoryId : null
        })
        deck
          .save()
          .then(deck => res.json(deck))
          .catch(err => res.json(err))
      }
    })
  }

  update(req, res) {
    const { errors, isValid } = validateDeckInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }

    Deck.findByIdAndUpdate(req.params.id, req.body)
      .then(response =>
        Deck.findById(req.params.id)
          .then(deck => res.json(deck))
          .catch(err => res.json(err))
      )
      .catch(err => res.json(err))
  }

  delete(req, res) {
    Deck.findByIdAndDelete(req.params.id)
      .then(response => res.json({ success: true }))
      .catch(err => res.json(err))
  }
}

export default new DecksController()
