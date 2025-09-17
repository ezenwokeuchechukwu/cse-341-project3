const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const { initializeDatabase } = require("../data/database");
const contactsRoutes = require("./contacts");
const homeRoutes = require("./home");
const { errorHandler } = require("../helpers");

// Swagger setup
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "Contacts API",
		version: "1.0.0",
		description: "API for managing contacts",
	},
	servers: [
		{
			url: "https://cse-341-project3-zouh.onrender.com",
		},
	],
};

const options = {
	swaggerDefinition,
	apis: ["./routes/*.js", "./controllers/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(express.json());

// Allow both your deployed URL and localhost for development
const allowedOrigins = [
	"https://cse-341-project3-zouh.onrender.com",
	"http://localhost:3000",
];

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
	})
);

// Routes
app.use("/contacts", contactsRoutes);
app.use("/", homeRoutes);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Centralized error handling middleware
app.use(errorHandler);

process.on("unhandledRejection", (error) => {
	console.error("Unhandled Rejection:", error);
});

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
