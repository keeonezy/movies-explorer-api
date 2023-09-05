const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/status-401');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Нужна авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // Если не будет env, то будет использоваться dev ключ
    payload = jwt.verify(token, NODE_ENV !== 'production' ? 'SECRET__HEHE' : JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Нужна авторизация'));
    return;
  }

  req.user = payload;
  next();
};
