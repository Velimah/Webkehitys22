'use strict';

const {getCat, getAllCats, addCat, updateCat, deleteCat} = require(
    '../models/catModel');
const {httpError} = require('../utils/errors');
const {validationResult} = require('express-validator');

const cat_list_get = async (req, res, next) => {
  try {

    const kissat = await getAllCats(next);
    res.json(kissat);

  } catch (e) {
    console.error('cat_list_get', e.message);
    next(httpError('Invalid input', 400));
  }
};

const cat_get = async (req, res, next) => {
  try {
    const cat = await getCat(req.params.id, next);
    if (cat.length > 0) {
      res.json(cat.pop());
    } else {
      next(httpError('No cat found', 400));
    }
  } catch (e) {
    console.error('cat_get', e.message);
    next(httpError('Invalid input', 400));
  }
};

const cat_post = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.error('cat_post validation', errors.array());
      next(httpError('invalid data', 400));
      return;
    }

    const data = [
      req.body.name,
      req.body.birthdate,
      req.body.weight,
      req.body.owner,
      req.file.filename,
    ];

    const result = await addCat(data, next);
    if (result.affectedRows > 0) {
      res.json({
        message: 'cat added',
        cat_id: result.insertId,
      });
    } else {
      next(httpError('No cat modified', 400));
    }
  } catch (e) {
    console.error('cat_post', e.message);
    next(httpError('Invalid input', 400));
  }
};

const cat_update_put = async (req, res, next) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.error('cat_update_put validation', errors.array());
      next(httpError('invalid data', 400));
      return;
    }

    const data = [
      req.body.name,
      req.body.birthdate,
      req.body.weight,
      req.body.owner,
      req.body.id,
    ];

    const result = await updateCat(data, next);
    if (result.affectedRows > 0) {
      res.json({
        message: 'cat modified',
      });
    } else {
      next(httpError('No cat modified', 400));
    }
  } catch (e) {
    console.error('cat_update_put', e.message);
    next(httpError('Invalid input', 400));
  }
};

const cat_delete = async (req, res, next) => {
  try {

    const result = await deleteCat(req.params.id, next);
    if (result.affectedRows > 0) {
      res.json({
        message: 'cat deleted',
      });
    } else {
      next(httpError('No cat deleted', 400));
    }
  } catch (e) {
    console.error('cat_delete', e.message);
    next(httpError('Invalid input', 400));
  }
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
  cat_update_put,
  cat_delete,
};