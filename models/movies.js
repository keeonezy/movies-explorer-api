const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcryptjs');

const moviesChema = new mongoose.Schema({
  country: {
    type: String,
  },

  director: {
    type: String,
  },

  duration: {
    type: Number,
  },

  year: {
    type: String,
  },

  description: {
    type: String,
  },

  image: {
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Не корректный URL',
    },
  },

  trailerLink: {
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Не корректный URL',
    },
  },

  thumbnail: {
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Не корректный URL',
    },
  },

  owner: {
    type: String,
    required: true,
  },

  movieId: {
    type: Number,
    required: true,
  },

  nameRU: {
    type: String,
  },

  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movies', moviesChema);
