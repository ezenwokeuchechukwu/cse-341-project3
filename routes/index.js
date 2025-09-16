const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const { initializeDatabase } = require("../data/database");
const contactsRoutes = require("./contacts");
const homeRoutes = require("./home");

// Swagger setup
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

// Swagger definition and options
const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "Contacts API",
		version: "1.0.0",
		description: "API for managing contacts",
	},
	servers: [
		{
			url: "https://cse341-node-9dp6.onrender.com",
		},
	],
};

const options = {
	swaggerDefinition,
	apis: ["./routes/*.js", "./controllers/*.js"],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// parse JSON data
app.use(express.json());

// Configure CORS to allow localhost
app.use(
	cors({
		origin: "https://cse341-node-9dp6.onrender.com",
	})
);

// Routes
app.use("/contacts", contactsRoutes);
app.use("/", homeRoutes);

// Serve Swagger UI with generated spec
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
	console.error("Unhandled Rejection:", error);
});

// Initialize the database and start the server
initializeDatabase()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Database initialization failed:", error);
		process.exit(1);
	});

module.exports = app;
