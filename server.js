require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("cookie-session");
const githubstrategy = require("passport-github").Strategy;
const swaggerSetup = require("./swagger");
require("./config/passport"); // initialize passport strategies

const contactsRoutes = require("./routes/contacts");
const productsRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// cookie session for passport (required to handle OAuth redirect states)
app.use(
  session({
    name: "session",
    keys: [process.env.SESSION_SECRET || "secretkey"],
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/products", productsRoutes);

// Swagger Docs
swaggerSetup(app);

// Error handler (basic)
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
