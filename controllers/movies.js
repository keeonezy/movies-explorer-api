const mongoose = require('mongoose');
const Movie = require('../models/movies');
const { STATUS_CREATED } = require('../errors/responseStatus');
const BadRequestError = require('../errors/status-400');
const ForbiddenError = require('../errors/status-403');
const NotFoundError = require('../errors/status-404');

module.exports.getMovies = (req, res, next) => {
  Movie
    .find({}).sort({ createdAt: -1 })
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createMovies = (req, res, next) => {
  const body = { ...req.body, owner: req.user._id };

  Movie.create(body)
    // 201 статус должен быть успешным
    .then((card) => res.status(STATUS_CREATED).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Не правильно переданы данные'));
      } else next(err);
    });
};

module.exports.deleteMovies = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.movieId)
    .orFail(() => { throw new NotFoundError('Карточка для удаления не найдена'); })
    .then((card) => card.owner.equals(req.user._id))
    .then((match) => {
      if (!match) {
        throw new ForbiddenError('Нет прав для удаления данной карточки');
      }
      return Movie.findByIdAndRemove(req.params.movieId);
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Не правильно переданы данные'));
      } else next(err);
    });
};
