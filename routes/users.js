const router = require('express').Router();
const { getUserInfo, updateUser, createUser, loginUser } = require('../controllers/users');

router.patch('/signup', createUser);
router.patch('/signin', loginUser);
router.get('/users/me', getUserInfo);
router.patch('/users/me', updateUser);

module.exports = router;
