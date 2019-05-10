import Card from '../models/Card'
import validateCardInput from '../validators/card'

class CardsController {
  getAll(req, res) {
    Card.find({ userId: req.user.id })
      .then(cards => res.json(cards))
      .catch(err => res.json(err))
  }

  create(req, res) {
    const { errors, isValid } = validateCardInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    const card = new Card({
      key: req.body.key,
      value: req.body.value,
      deckId: req.body.deckId ? req.body.deckId : null,
      userId: req.user.id
    })
    card
      .save()
      .then(card => res.json(card))
      .catch(err => res.json(err))
  }

  update(req, res) {
    const { errors, isValid } = validateCardInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }

    Card.findByIdAndUpdate(req.params.id, req.body)
      .then(response =>
        Card.findById(req.params.id)
          .then(card => res.json(card))
          .catch(err => res.json(err))
      )
      .catch(err => res.json(err))
  }

  delete(req, res) {
    Card.findByIdAndDelete(req.params.id)
      .then(response => res.json({ success: true }))
      .catch(err => res.json(err))
  }
}

export default new CardsController()
