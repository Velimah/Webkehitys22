'use strict';

const {getAllUsers, getUser, addUser} = require('../models/userModel');

const users_get = async (req, res, next) => {
  const users = await getAllUsers(next);
  res.json(users);
};

const user_get = async (req, res, next) => {
  const user = await getUser(req.params.id, next);
  if (user.length > 0) {
    res.json(user.pop());
  } else {
    res.send('virhe');
  }
};

const user_create_post = async (req, res, next) => {
  console.log('user_post', req.body, next);
  const data = [
    req.body.name,
    req.body.email,
    req.body.passwd,
  ];

  const result = await addUser(data, next);
  if (result.affectedRows > 0) {
    res.json({
      message: 'user added',
      user_id: result.insertId,
    });
  } else {
    res.send('virhe');
  }
};

module.exports = {
  users_get,
  user_get,
  user_create_post,
};