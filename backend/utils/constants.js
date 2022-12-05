const STATUS_OK = 200;
const STATUS_CREATED = 201;
const ERROR_SERVER = 500;
const ERROR_VALIDATION = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_AUTH = 401;
const ERROR_CONFLICT = 409;
const ERROR_FORBIDDEN = 403;
const SALT_ROUND = 10;

const { NODE_ENV, JWT_SECRET = 'JWT_SECRET' } = process.env;
const { DB_ADDRESS = 'mongodb://localhost:27017/mestodb' } = process.env;

module.exports = {
  STATUS_OK,
  STATUS_CREATED,
  ERROR_SERVER,
  ERROR_VALIDATION,
  ERROR_NOT_FOUND,
  ERROR_AUTH,
  ERROR_CONFLICT,
  ERROR_FORBIDDEN,
  SALT_ROUND,
  NODE_ENV,
  JWT_SECRET,
  DB_ADDRESS,
};
