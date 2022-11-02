'use strict';

const {users, getUser} = require('../models/userModel');

const users_get = (req, res) => {
  res.json(users);
};

const user_get = (req, res) => {
  const user = getUser(req.params.id);
  console.log('user', user);
  res.json(user);
};

module.exports = {
  users_get, user_get,
};