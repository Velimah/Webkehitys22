'use strict';

const express = require('express');

const router = express.Router();
const {users_get, user_get, user_create_post, checkToken, user_delete, user_put} = require(
    '../controllers/userController');
const {body} = require('express-validator');

router.route('/')
  .get(users_get)
  .post(body('name').isLength({min: 3}).escape(),
        body('email').isEmail(),
        body('passwd').matches(/(?=.*\p{Lu}).{8,}/u), user_create_post)
  .put(user_put);

router.get('/token', checkToken);

router.route('/:id').get(user_get).delete(user_delete);


module.exports = router;