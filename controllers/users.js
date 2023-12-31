const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { STATUS_CREATED } = require('../errors/responseStatus');
const BadRequestError = require('../errors/status-400');
const NotFoundError = require('../errors/status-404');
const ConflictError = require('../errors/status-409');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(String(req.body.password), 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(STATUS_CREATED).send({
      email: user.email,
      name: user.name,
      _id: user._id,
    }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Не правильно переданы данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с такой почтой уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      // Если не будет env, то будет использоваться dev ключ
      const token = jwt.sign({ _id: user._id }, NODE_ENV !== 'production' ? 'SECRET__HEHE' : JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((data) => res.send(data))
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError('Пользователь не найден');
      }
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Данный email используется другим пользователем'));
      } if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Не правильно переданы данные'));
      } else next(err);
    });
};
