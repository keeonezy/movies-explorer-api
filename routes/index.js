const router = require('express').Router();
// Роутер пользователя
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { loginUser, createUser } = require('../controllers/users');

router.post('/signin', loginUser);
router.post('/signup', createUser);

router.use(userRouter);
router.use(moviesRouter);

// router.use('/*', (req, res, next) => {
//   next(new NotFoundError('Страница не найдена'));
// });

module.exports = router;