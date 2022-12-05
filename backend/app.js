require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');

const router = require('./routes/index');
const { errorsHandler } = require('./middlewares/errors-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DB_ADDRESS } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const app = express();

const options = {
  origin: [
    'http://localhost:3010',
    'https://staskudinow.mesto.nomoredomains.club',
    'https://staskudinow.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_ADDRESS, {
  autoIndex: true,
});

app.use(requestLogger);

// Краш-тест (удалить после ревью)
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorsHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен на:');
  // eslint-disable-next-line no-console
  console.log('http://localhost:3000');
});
