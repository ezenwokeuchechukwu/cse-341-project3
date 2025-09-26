// routes/contacts.js
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const authenticateToken = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact management API (Protected with JWT)
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contacts (Protected)
 *     security:
 *       - bearerAuth: []
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: List of all contacts
 */
router.get("/", authenticateToken, async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Get contact by ID (Protected)
 *     security:
 *       - bearerAuth: []
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact data
 */
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contact" });
  }
});

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a new contact (Protected)
 *     security:
 *       - bearerAuth: []
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created
 */
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = new Contact({ name, email, phone });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ error: "Failed to create contact" });
  }
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Update a contact by ID (Protected)
 *     security:
 *       - bearerAuth: []
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated
 */
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update contact" });
  }
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID (Protected)
 *     security:
 *       - bearerAuth: []
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted
 */
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

module.exports = router;
