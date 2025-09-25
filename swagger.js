const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contacts API",
      version: "1.0.0",
      description: "Contacts + Products API with OAuth"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ["./routes/*.js"] // add JSDoc comments in route files or controllers
};

const specs = swaggerJsDoc(options);
module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
