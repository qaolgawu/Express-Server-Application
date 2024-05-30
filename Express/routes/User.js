const usersRouter = require('express').Router();
const { getAllUsers, createUser } = require('../controllers/User');

usersRouter.get('/', getAllUsers);
usersRouter.post('/', createUser);

module.exports = usersRouter;