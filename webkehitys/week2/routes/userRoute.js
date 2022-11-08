'use strict';

const express = require('express');

const router = express.Router();
const {users_get, user_get, user_create_post} = require(
    '../controllers/userController');

router.route('/')
  .get(users_get)
  .post(user_create_post)
  .put( (req, res) => {
    res.send('With this endpoint you can edit cats.');
  })
  .delete((req, res) => {
    res.send('With this endpoint you can delete cats.');
  });

router.route('/:id/')
  .get(user_get);

module.exports = router;