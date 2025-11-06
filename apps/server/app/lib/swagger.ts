import express = require('express')
const router = express.Router()
import path = require('path');
import swaggerJsdoc = require("swagger-jsdoc");
import swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
        title: "LogRocket Express API with Swagger",
        version: "0.1.0",
        description:
            "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
            name: "LogRocket",
            url: "https://logrocket.com",
            email: "info@email.com",
        },
        },
        servers: [
        {
            url: `http://localhost:${process.env.PORT}`,
        },
        ],
    },
    apis: ["./routes/*.js"],
};
  
router.use(express.static(path.join(__dirname, '/public')));

const specs = swaggerJsdoc(options);
router.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);
  
router.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);
  