const router = require('express').Router();
const notFound = require('../controllers/notFound');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateCreateUser, validateLogin } = require('../middlewares/validate');
const moviesRouter = require('./movies');
const usersRouter = require('./users');

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);
router.use('/*', notFound);

module.exports = router;
