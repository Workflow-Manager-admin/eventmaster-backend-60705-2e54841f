const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Event Manager API',
      version: '1.0.0',
      description: 'REST API for event creation, management, user registration, and authentication.',
    },
    servers: [
      {
        url: 'https://vscode-internal-731-dev.dev01.cloud.kavia.ai:3001',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      { bearerAuth: [] }
    ],
  },
  apis: ['./src/routes/*.js'], // Load API routes documentation
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
