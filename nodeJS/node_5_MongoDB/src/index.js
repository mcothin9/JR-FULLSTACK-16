const express = require('express');
const cors = require('./middleware/cors');
const v1Router = require('./routes');

const app = express();

app.use(express.json());
app.use(cors);

// GET /v1/tasks
// app.use('/v1');
// GET /tasks
app.use(v1Router);

app.listen(3000, () => {
    console.log('server listening');
});