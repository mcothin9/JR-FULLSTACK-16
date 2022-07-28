const express = require('express');
const studentRouter = require('./student');

const v1Router = express.Router();

v1Router.use('/students', studentRouter);

module.exports = v1Router;