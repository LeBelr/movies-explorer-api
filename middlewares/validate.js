const { celebrate, Joi } = require('celebrate');
const httpRegEx = require('../utils/regEx');
const { emailRegEx } = require('../utils/regEx');

const validateChangeUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(emailRegEx),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(emailRegEx),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(emailRegEx),
    password: Joi.string().required(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(httpRegEx),
    trailerLink: Joi.string().required().regex(httpRegEx),
    thumbnail: Joi.string().required().regex(httpRegEx),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  validateChangeUserInfo,
  validateCreateUser,
  validateLogin,
  validateCreateMovie,
  validateDeleteMovie,
};
