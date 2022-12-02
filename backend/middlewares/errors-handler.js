/* eslint-disable linebreak-style */
const { ERROR_SERVER } = require('../utils/constants');

module.exports.errorsHandler = (err, req, res, next) => {
  const { statusCode = ERROR_SERVER, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === ERROR_SERVER
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};
