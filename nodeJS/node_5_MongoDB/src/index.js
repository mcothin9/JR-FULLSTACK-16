const express = require('express');
const cors = require('./middleware/cors');
const swaggerUi = require('swagger-ui-express');

const v1Router = require('./routes');
const swaggerJsDoc = require('./utils/swagger');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

// GET /v1/tasks
// app.use('/v1');
// GET /tasks
app.use(v1Router);

app.listen(PORT, () => {
    console.log(`server listening: ${PORT}`);
});