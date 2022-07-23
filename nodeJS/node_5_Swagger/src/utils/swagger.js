const swaggerJsDoc = require('swagger-jsdoc');

module.exports = swaggerJsDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'JR tasks',
            version: '1.0.0',
            contact: {
                name: 'Mitchell',
                email: 'mingchenothin9@gmail.com'
            },
            description: 'this is a demo API',
        },
    },
    apis: ['src/controllers/*.js'],
});