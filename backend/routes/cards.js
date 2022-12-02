const router = require('express').Router();

const { cardBodyValidator, cardParamsValidator } = require('../middlewares/validators/card-validators');

const {
  getCards, postCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', cardBodyValidator, postCard);

router.delete('/cards/:cardId', cardParamsValidator, deleteCardById);

router.put('/cards/:cardId/likes', cardParamsValidator, likeCard);

router.delete('/cards/:cardId/likes', cardParamsValidator, dislikeCard);

module.exports = router;
