const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Movie = require('../models/movies');
const { STATUS_CREATED } = require('../errors/responseStatus');
const BadRequestError = require('../errors/status-400');
const ForbiddenError = require('../errors/status-403');
const NotFoundError = require('../errors/status-404');

module.exports.getMovies = (req, res, next) => { }

module.exports.createMovies = (req, res, next) => { }

module.exports.deleteMovies = (req, res, next) => { }