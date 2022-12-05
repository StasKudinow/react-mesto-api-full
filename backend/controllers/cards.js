const Card = require('../models/card');

const {
  STATUS_CREATED,
  ERROR_VALIDATION,
} = require('../utils/constants');

const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('likes')
    .then((data) => res.send(data))
    .catch(next);
};

module.exports.postCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((data) => res.status(STATUS_CREATED).send(data))
    .catch((err) => {
      if (err.statusCode === ERROR_VALIDATION) {
        return next(new ValidationError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .populate('likes')
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      if (data.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нет доступа');
      }
      return res.send(data);
    })
    .then(() => Card.findByIdAndRemove(req.params.cardId))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      return res.send(data);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      return res.send(data);
    })
    .catch(next);
};
