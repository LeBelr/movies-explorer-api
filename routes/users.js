const usersRouter = require('express').Router();
const { getMyInfo, changeUserInfo } = require('../controllers/users');
const { validateChangeUserInfo } = require('../middlewares/validate');

usersRouter.get('/me', getMyInfo);
usersRouter.patch('/me', validateChangeUserInfo, changeUserInfo);

module.exports = usersRouter;
