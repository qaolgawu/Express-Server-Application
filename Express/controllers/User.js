const User = require('../models/User');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  console.log(req.body);
    User.create({
      name,
      email,
      password: password,
    })
    .then((user) => res.send(user))
    .catch((err) => {
      res.send(err)
      next(err)
    });
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.send(data))
    .catch((err) => next(err))
}


