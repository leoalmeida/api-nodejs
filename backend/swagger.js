const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "api-nodejs",
        description: "Projeto de exemplo..."
    },
    servers: [
        {
            url: 'http://localhost:8080'
        }
    ],
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    components: {
        schemas: {
            user: {
                $id: "1212323",
                $name: "Jhon Doe"
            },
            resource: {
                id: "1212323",
                name: "Jhon Doe",
                type: "hub",
                status: "running"
            },
            status:{
                resid: "221212",
                status: "running"
            },
            statusEnum: {
                '@enum': [
                    "running",
                    "stopped",
                    "failed"
                ]
            }
        },
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
};

const outputFile = './config/swagger.json';
const endpointsFiles = ['./api/routes/resource', './api/routes/status', './api/routes/user'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server');           // Your project's root file
});