/* eslint-disable linebreak-style */
const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { login, postUser } = require('../controllers/users');
const { userBodyValidator } = require('../middlewares/validators/user-validators');

router.post('/signin', userBodyValidator, login);
router.post('/signup', userBodyValidator, postUser);

router.use(auth);

router.use('/', userRouter);
router.use('/', cardRouter);

router.all('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
