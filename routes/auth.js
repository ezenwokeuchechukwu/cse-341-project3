// routes/auth.js
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Redirect to GitHub for login
router.get("/github", passport.authenticate("github"));

// GitHub callback URL
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",        // Redirect if login fails
    successRedirect: "/auth/profile", // Redirect after successful login
  })
);

// Logout route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);   // Handle errors
    res.redirect("/");            // Redirect to homepage (or any route) after logout
  });
});


// Protected profile route
router.get("/profile", (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: "Not logged in" });
  }
  // Return logged-in user's info
  res.send({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    githubId: req.user.githubId,
  });
});

module.exports = router;
