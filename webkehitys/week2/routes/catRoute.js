'use strict';

const express = require('express');

const multer = require('multer');
const upload = multer({dest: './uploads/'});

const router = express.Router();
const {cat_list_get, cat_get, cat_post, cat_update_put, cat_delete} = require(
    '../controllers/catController');
const {body} = require('express-validator');

//.post(passport.authenticate('jwt', {session: false}), upload.single('cat'),
router.route('/')
  .get(cat_list_get)
  .post(upload.single('cat'),
    body('name').isLength({min:1}).escape(),
    body('birthdate').isDate(),
    body('weight').isNumeric(),
    body('owner').isNumeric(),
    cat_post)
  .put(body('name').isLength({min:1}).escape(),
    body('birthdate').isDate(),
    body('weight').isNumeric(),
    body('owner').isNumeric(),
    body('id').isNumeric(),
    cat_update_put);

router.route('/:id/')
  .delete(cat_delete)
  .get(cat_get);

module.exports = router;