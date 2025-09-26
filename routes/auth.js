const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// =====================
// Swagger Docs
// =====================

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */
router.post("/register", async (req, res) => {
  // registration logic here
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and receive a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token returned
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", async (req, res) => {
  // login logic here
});

/**
 * @swagger
 * /auth/protected:
 *   get:
 *     summary: Access a protected route
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []   # requires JWT in Authorization header
 *     responses:
 *       200:
 *         description: Protected data returned
 *       401:
 *         description: No token provided
 *       403:
 *         description: Invalid token
 */
router.get("/protected", (req, res) => {
  // protected route logic here
});

module.exports = router;
