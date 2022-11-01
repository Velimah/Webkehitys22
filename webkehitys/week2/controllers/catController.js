'use strict';
const {cats} = require('../models/catModel');

const cat_list_get = (req, res) => {
  res.json(cats);
};

const cat_get = (req, res) => {
  res.json(cats[req.params.id-1]);
};

module.exports = {
  cat_list_get, cat_get,
};