const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

let database = null;

// Initialize the database connection
const initializeDatabase = async () => {
	if (database) {
		console.log("Database is already initialized!");
		return;
	}
	try {
		const client = await MongoClient.connect(process.env.MONGODB_URI);
		database = client.db();
		console.log("Database initialized");
	} catch (error) {
		console.error("Failed to connect to database:", error);
		throw error;
	}
};

// Get the database instance
const getDatabase = () => {
	if (!database) {
		throw new Error("Database not initialized");
	}
	return database;
};

module.exports = {
	initializeDatabase,
	getDatabase,
};
