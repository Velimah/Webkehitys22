'use strict';
// userController
const {getUser, getAllUsers, addUser, deleteUser, updateUser} = require('../models/userModel');
const {validationResult} = require('express-validator');
const {httpError} = require('../utils/errors');

const users_get = async (req, res, next) => {
  try {
    const users = await getAllUsers(next);
    if (users.length < 1) {
      next(httpError('No users found', 404));
      return;
    }
    res.json(users);
  } catch (e) {
    console.error('user_list_get', e.message);
    next(httpError('Internal server error', 500));
  }
};

const user_get = async (req, res, next) => {
  try {
    const user = await getUser(req.params.id, next);
    if (user.length < 1) {
      next(httpError('No user found', 404));
      return;
    }
    res.json(user.pop());
  } catch (e) {
    console.error('user_get', e.message);
    next(httpError('Internal server error', 500));
  }
};

const user_create_post = async (req, res, next) => {
  try {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error('user_post validation', errors.array());
      next(httpError('Invalid data', 400));
      return;
    }

    const data = [
      req.body.name,
      req.body.email,
      req.body.passwd,
    ];

    const result = await addUser(data, next);
    if (result.affectedRows < 1) {
      next(httpError('Invalid data', 400));
      return;
    }

    res.json({
      message: 'user added',
      user_id: result.insertId,
    });
  } catch (e) {
    console.error('user_post', e.message);
    next(httpError('Internal server error', 500));
  }
};

const user_put = async (req, res, next) => {
  try {

    const data = [
      req.body.name,
      req.body.email,
      req.body.passwd,
      req.body.id,
    ];

    const result = await updateUser(data, next);
    if (result.affectedRows < 1) {
      next(httpError('Invalid data', 400));
      return;
    }

    res.json({
      message: 'user modified',
      user_id: result.insertId,
    });
  } catch (e) {
    console.error('user_put', e.message);
    next(httpError('Internal server error', 500));
  }
};

const user_delete = async (req, res, next) => {
  try {
    const result = await deleteUser(req.params.id, next);
    if (result.affectedRows < 1) {
      next(httpError('No user deleted', 404));
      return;
    }
    res.json({
      message: 'user deleted',
    });
  } catch (e) {
    console.error('user_delete', e.message);
    next(httpError('Internal server error', 500));
  }
};

const checkToken = (req, res, next) => {
  if (!req.user) {
    next(new Error('token not valid'));
  } else {
    res.json({ user: req.user });
  }
};

module.exports = {
  users_get,
  user_get,
  user_create_post,
  user_put,
  user_delete,
  checkToken,
};