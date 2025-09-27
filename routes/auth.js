const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Start GitHub login
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub callback
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    // Issue a JWT after successful login
    const token = jwt.sign(
      { id: req.user._id, username: req.user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.send(`
      <h1>Login successful!</h1>
      <p>Welcome, ${req.user.username}</p>
      <p>Email: ${req.user.email || "Not provided"}</p>
      <p>Your API Token (use in Swagger "Authorize" button):</p>
      <pre>${token}</pre>
      <p><a href="/profile">Go to Profile</a></p>
      <p><a href="/auth/logout">Logout</a></p>
    `);
  }
);

// Failure route
router.get("/failure", (req, res) => {
  res.send("<h1>Login failed. Please <a href='/auth/github'>try again</a></h1>");
});

// Profile (only if logged in)
router.get("/profile", (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/github");
  }
  res.send(`
    <h1>Welcome, ${req.user.username}</h1>
    <p>Email: ${req.user.email || "Not provided"}</p>
    <p><a href="/auth/logout">Logout</a></p>
  `);
});

// Logout
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
});

module.exports = router;
