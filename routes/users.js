const router = require('express').Router();
const { userUpdateValidator } = require('../middlewares/validation');
const { getUserInfo, updateUser } = require('../controllers/users');

router.get('/users/me', getUserInfo);
router.patch('/users/me', userUpdateValidator, updateUser);

module.exports = router;
