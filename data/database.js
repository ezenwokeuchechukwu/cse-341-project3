const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

let database = null;

const initializeDatabase = async () => {
  if (database) {
    console.log("Database is already initialized!");
    return;
  }

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME || "contactsDB";

  if (!uri) {
    throw new Error("MONGODB_URI is not defined in .env");
  }

  try {
    // Removed useNewUrlParser and useUnifiedTopology options
    const client = await MongoClient.connect(uri);

    database = client.db(dbName);
    console.log(`Connected to MongoDB → Database: ${dbName}`);
  } catch (error) {
    console.error("Failed to connect to database:", error.message);
    throw error;
  }
};

const getDatabase = () => {
  if (!database) {
    throw new Error("Database not initialized. Call initializeDatabase() first.");
  }
  return database;
};

module.exports = {
  initializeDatabase,
  getDatabase,
};
