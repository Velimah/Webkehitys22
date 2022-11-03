'use strict';

const {getAllUsers, getUser} = require('../models/userModel');

const users_get = async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
};

const user_get = async (req, res) => {
  const user = await getUser(req.params.id);
  if(user.length > 0) {
    res.json(user.pop());
  }  else {
    res.send('virhe');
  }
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