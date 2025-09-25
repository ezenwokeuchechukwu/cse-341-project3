// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

// Initialize passport strategies
require("./config/passport");

// Import routes
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const contactsRoutes = require("./routes/contacts");
const productsRoutes = require("./routes/products");

// Swagger setup
const swaggerSetup = require("./swagger");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Express-session (works with passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);              // GitHub login/logout
app.use("/api/users", usersRoutes);        // Users CRUD API
app.use("/api/contacts", contactsRoutes);  // Contacts API
app.use("/api/products", productsRoutes);  // Products API

// Swagger documentation
swaggerSetup(app);

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    const port = process.env.PORT || 3000;
    app.listen(port, () =>
      console.log(`🚀 Server running on http://localhost:${port}`)
    );
  })
  .catch((err) => console.error("❌ DB Connect error", err));
