const swaggerJSDoc = require("swagger-jsdoc");
const fs = require("fs");

// Swagger definition
const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "Contacts API",
		version: "1.0.0",
		description: "API for managing contacts",
	},
	servers: [
		{
			url: "http://localhost:3000",
		},
	],
};

// Options for swagger-jsdoc
const options = {
	swaggerDefinition,
	apis: ["./routes/*.js", "./controllers/*.js"],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Write swagger specification to swagger.json
fs.writeFileSync(
	"./swagger.json",
	JSON.stringify(swaggerSpec, null, 2),
	"utf-8"
);

console.log("swagger.json has been generated!");
