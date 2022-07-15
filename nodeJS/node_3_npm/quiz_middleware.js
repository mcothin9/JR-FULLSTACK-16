const express = require('express');

const app = express();

function m1(req, res, next) {
  console.log('m1 called');
  next();
}

function m2(req, res, next) {
  console.log('m2 called');
  next();
}

function m3(req, res, next) {
  console.log('m3 called');
  next();
}

function m4(req, res, next) {
  console.log('m4 called');
  next();
}

// quiz

/** GET /v1/tasks/1
 * 
 * middleware => m1, m3, m4, route handler
 * 'm1 called'
 * 'm2 called'
 * { 1 }            wrong!!
 * { "id": "1" } <= correct answer
 */

/** GET /v1/tasks
 * 
 * middleware => m1, m3, m4
 * 'm1 called'
 * 'm2 called'      missed!!
 * 'm3 called'
 * 'm4 called'
 * { Cannot get /v1/tasks }
 */

// middleware chain
// [];

// event bubbling

app.use(m1);
app.use('/v1', m2);
app.get('/v1/tasks', m3);
app.get('/v1/tasks', m4);
app.get('/v1/tasks/:id', (req, res) => {
  res.json(req.params);
});

app.listen(3000, () => console.log('listen on 3000'));