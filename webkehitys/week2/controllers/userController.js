'use strict';

const {getAllUsers, getUser, addUser} = require('../models/userModel');
const {validationResult} = require('express-validator');
const {httpError} = require('../utils/errors');

const users_get = async (req, res, next) => {
  try {

    const users = await getAllUsers(next);
    res.json(users);
  } catch (e) {
    console.error('users_get', e.message);
    next(httpError('Invalid input', 400));
  }

};

const user_get = async (req, res, next) => {
  try {
    const user = await getUser(req.params.id, next);

    if (user.length > 0) {
      res.json(user.pop());
    } else {
      next(httpError('No user found', 400));
    }

  } catch (e) {
    console.error('user_get', e.message);
    next(httpError('Invalid input', 400));
  }
};

const user_create_post = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.error('user_create_post validation', errors.array());
      next(httpError('invalid data', 400));
      return;
    }

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
      next(httpError('No user created', 400));
    }

  } catch (e) {
    console.error('user_create_post', e.message);
    next(httpError('Invalid input', 400));
  }
};

module.exports = {
  users_get,
  user_get,
  user_create_post,
};