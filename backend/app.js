const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const router = require('./routes/index');
const { errorsHandler } = require('./middlewares/errors-handler');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  autoIndex: true,
});

app.use(router);

app.use(errors());

app.use(errorsHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен на:');
  // eslint-disable-next-line no-console
  console.log('http://localhost:3000');
});
