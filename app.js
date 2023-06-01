const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
require('dotenv').config();
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rateLimiter');
const router = require('./routes');
const handlerErrors = require('./middlewares/hanlerErrors');

const { NODE_ENV, PORT, DB_PATH } = process.env;

const app = express();

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

app.listen(NODE_ENV === 'production' ? PORT : 3001, () => {
  console.log('Сервер на порту 3001');
});
