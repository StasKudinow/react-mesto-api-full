const router = require('express').Router();

const {
  getUsers, getCurrentUser, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');

const {
  userParamsValidator, userNameAndAboutValidator, userAvatarValidator,
} = require('../middlewares/validators/user-validators');

router.get('/users', getUsers);

router.get('/users/me', getCurrentUser);

router.get('/users/:userId', userParamsValidator, getUserById);

router.patch('/users/me', userNameAndAboutValidator, updateUser);

router.patch('/users/me/avatar', userAvatarValidator, updateAvatar);

module.exports = router;
