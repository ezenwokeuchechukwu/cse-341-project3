const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (roles = []) => async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Missing Authorization header" });

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;

    if (roles.length && !roles.includes(payload.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = requireAuth;
