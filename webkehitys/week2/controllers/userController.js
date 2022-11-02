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

const user_post = (req, res) => {
  console.log(req.body);
  res.send('add user route');
};

module.exports = {
  users_get,
  user_get,
  user_post,
};