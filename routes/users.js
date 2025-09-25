const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API
 */

// CRUD routes
router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserById);
router.post("/", usersController.createUser);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;
