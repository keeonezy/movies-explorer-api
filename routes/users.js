const router = require('express').Router();
const { getUserInfo, updateUser, createUser, loginUser } = require('../controllers/users');

router.get('/users/me', getUserInfo);
router.patch('/users/me', updateUser);
router.patch('/signup', createUser);
router.patch('/signin', loginUser);

module.exports = router;
