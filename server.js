// --------------------
// Load environment variables
// --------------------
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
const PORT = process.env.PORT || 3000;

// --------------------
// MongoDB Connection
// --------------------
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --------------------
// Middleware
// --------------------
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions (needed for Passport OAuth)
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// --------------------
// Routes
// --------------------
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const contactRoutes = require("./routes/contacts");

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/contacts", contactRoutes);

// Swagger API docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Home route
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome</h1>
    <p>Try <a href="/auth/github">Login with GitHub</a></p>
    <p>Or view <a href="/api-docs">API Docs</a></p>
  `);
});

// --------------------
// Error Handling
// --------------------
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// --------------------
// Start Server
// --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
