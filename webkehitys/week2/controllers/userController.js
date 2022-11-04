'use strict';

const {getAllUsers, getUser, addUser} = require('../models/userModel');

const users_get = async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
};

const user_get = async (req, res) => {
  const user = await getUser(req.params.id);
  if (user.length > 0) {
    res.json(user.pop());
  } else {
    res.send('virhe');
  }
};

const user_create_post = async (req, res) => {
  console.log('user_post', req.body);
  const data = [
    req.body.name,
    req.body.email,
    req.body.passwd,
  ];

  const result = await addUser(data);
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