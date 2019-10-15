const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { keys } = require('../config/keys');
const { User } = require('../models/User');
const { Category } = require('../models/Category');
const { Deck } = require('../models/Deck');

const register = (req, res) => {
  let errors = [];
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.push({ field: 'email', message: 'Email already exists' });
      return res.status(400).json(errors);
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user
            .save()
            .then(user =>
              res
                .status(201)
                .json({ success: true, message: 'User created successfully' }),
            )
            .catch(err => res.status(400).json(err));
        });
      });
    }
  });
};

const login = (req, res) => {
  let errors = [];
  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.push({ field: 'email', message: 'User not found' });
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, email: user.email };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              success: true,
              token,
            });
          },
        );
      } else {
        errors.push({ field: 'password', message: 'Password incorrect' });
        return res.status(400).json(errors);
      }
    });
  });
};

const update = (req, res) => {
  User.findById(req.user.id).then(user => {
    const { name, email } = req.body;
    user.name = name;
    user.email = email;
    user
      .save()
      .then(user =>
        res
          .status(200)
          .json({ success: true, message: 'User updated successfully' }),
      )
      .catch(err => res.status(400).json(err));
  });
};

const changePassword = (req, res) => {
  User.findById(req.user.id).then(user => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        user
          .save()
          .then(user =>
            res.status(200).json({
              success: true,
              message: 'Password updated successfully',
            }),
          )
          .catch(err => res.status(400).json(err));
      });
    });
  });
};

const remove = async (req, res) => {
  await User.findByIdAndDelete(req.user.id)
    .then(res =>
      res
        .status(200)
        .json({ success: true, message: 'User removed successfully' }),
    )
    .catch(err => res.status(400).json(err));
  await Category.deleteMany({ userId: req.user.id });
  await Deck.deleteMany({ userId: req.user.id });
};

exports.UserController = { register, login, update, changePassword, remove };
