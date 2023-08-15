const router = require('express').Router();
// Роутер пользователя
const userRouter = require('./users');
// const moviesRouter = require('./movies');
const { createUser, loginUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { signupValidator, signinValidator } = require('../middlewares/validation');
const NotFoundError = require('../errors/status-404');

router.post('/signin', signinValidator, loginUser);
router.post('/signup', signupValidator, createUser);
router.use(auth);

router.use(userRouter);
// router.use(moviesRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
