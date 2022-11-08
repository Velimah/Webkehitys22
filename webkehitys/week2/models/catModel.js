// ./models/catModel.js
'use strict';
const pool = require('../database/db');
const {httpError} = require('../utils/errors');
const promisePool = pool.promise();

const getAllCats = async (next) => {
  try {
    const [rows] = await promisePool.execute(`SELECT cat_id, wop_cat.name, weight, owner, filename, birthdate, wop_user.name AS ownername 
                                                  FROM wop_cat 
                                                  JOIN wop_user 
                                                  ON wop_cat.owner = wop_user.user_id`);
    return rows;
  } catch (e) {
    console.error('getAllCats', e.message);
    next(httpError('Database error', 500));
  }
};

const getCat = async (catId, next) => {
  try {
    const [rows] = await promisePool.execute(`SELECT cat_id, wop_cat.name, weight, owner, filename, birthdate, wop_user.name AS ownername 
                                                  FROM wop_cat 
                                                  JOIN wop_user 
                                                  ON wop_cat.owner = wop_user.user_id 
                                                  WHERE cat_id = ?;`, [catId]);
    return rows;
  } catch (e) {
    console.error('getCat', e.message);
    next(httpError('Database error', 500));
  }
};

const addCat = async (data) => {
  try {
    const [rows] = await promisePool.execute(`INSERT INTO wop_cat (name, birthdate, weight, owner, filename) 
                                                  VALUES (?, ?, ?, ?, ?);`,
        data);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const updateCat = async (data) => {
  try {
    const [rows] = await promisePool.execute(`UPDATE wop_cat set name = ?, birthdate = ?, weight = ?, owner = ? WHERE cat_id = ?;`, data);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
}

const deleteCat = async (catId) => {
  try {
    const [rows] = await promisePool.execute(`DELETE FROM wop_cat WHERE wop_cat.cat_id = ?;`,
        [catId]);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

module.exports = {
  getAllCats,
  getCat,
  addCat,
  updateCat,
  deleteCat,
};