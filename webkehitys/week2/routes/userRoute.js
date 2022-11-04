'use strict';

const express = require('express');

const router = express.Router();
const {users_get, user_get, user_create_post} = require(
    '../controllers/userController');

router.get('/', users_get);

router.get('/:id/', user_get);

router.post('/', user_create_post);

router.put('/', (req, res) => {
  res.send('With this endpoint you can edit cats.');
});

router.delete('/', (req, res) => {
  res.send('With this endpoint you can delete cats.');
});

module.exports = router;