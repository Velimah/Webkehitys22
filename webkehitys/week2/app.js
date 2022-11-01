'use strict';
const express = require('express');
const {cats} = require('./models/catModel');
const app = express();
const port = 3000;

app.get('/cat', (req, res) => {
  res.send('From this endpoint you can get cats.')
});

app.get('/cat/:id/', (req, res) => {
  res.send(`You requested a cat whose id is ${req.params.id}`);
  console.log(cats[req.params.id-1]);
});

app.post('/cat', (req, res) => {
  res.send('With this endpoint you can add cats.')
});

app.put('/cat', (req, res) => {
  res.send('With this endpoint you can edit cats.')
});

app.delete('/cat', (req, res) => {
  res.send('With this endpoint you can delete cats.')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
