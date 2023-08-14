const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcryptjs');

const UserChema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Не корректный EMAIL',
    },
  },

  password: {
    type: String,
    required: true,
    select: false, // Скрывает пароль от вывода
  },

  name: {
    type: String,
    required: true,
    // Минимальная длина символов
    minlength: 2,
    // Максимальная длина символов
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', UserChema);
