const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
require('dotenv').config();
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rateLimiter');
const router = require('./routes');
const handlerErrors = require('./middlewares/hanlerErrors');

const { NODE_ENV, PORT, DB_PATH } = process.env;

const app = express();

app.use((req, res, next) => {
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  res.header('Access-Control-Allow-Origin', '*');

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }
  next();
});

mongoose.connect(NODE_ENV === 'production' ? DB_PATH : 'mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(requestLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(rateLimiter);
app.use(helmet());

app.use('/', router);

app.use(errorLogger);

app.use(errors());
app.use(handlerErrors);

app.listen(NODE_ENV === 'production' ? PORT : 3000, () => {
  console.log('Сервер на порту 3000');
});
