const swaggerJSDoc = require("swagger-jsdoc");
const fs = require("fs");
const path = require("path");

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

// Output file path (configurable)
const outputPath = path.resolve(__dirname, "swagger.json");

try {
	fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2), "utf-8");
	console.log(`Swagger JSON has been generated successfully at: ${outputPath}`);
} catch (error) {
	console.error("Failed to write swagger.json:", error);
	process.exit(1);
}
