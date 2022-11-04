// ./models/catModel.js
'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    const [rows] = await promisePool.execute(`SELECT cat_id, wop_cat.name, weight, owner, filename, birthdate, wop_user.name AS ownername 
                                                  FROM wop_cat 
                                                  JOIN wop_user 
                                                  ON wop_cat.owner = wop_user.user_id`);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getCat = async (catId) => {
  try {
    const [rows] = await promisePool.execute(`SELECT cat_id, wop_cat.name, weight, owner, filename, birthdate, wop_user.name AS ownername 
                                                  FROM wop_cat 
                                                  JOIN wop_user 
                                                  ON wop_cat.owner = wop_user.user_id 
                                                  WHERE cat_id = ?;`, [catId]);
    return rows;
  } catch (e) {
    console.error('error', e.message);
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
    const [rows] = await promisePool.execute(`UPDATE wop_cat INNER JOIN wop_user 
                                                  ON wop_cat.owner = wop_user.user_id 
                                                  SET wop_cat.name = ?, wop_cat.birthdate = ?, wop_cat.weight = ? 
                                                  WHERE wop_user.user_id = ?;`,
        data);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

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