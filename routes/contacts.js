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

// Get all contacts
router.get("/", authenticateToken, async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    console.error("Failed to fetch contacts:", err);
    res.status(500).json({ error: "Failed to fetch contacts", details: err.message });
  }
});

// Get contact by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json(contact);
  } catch (err) {
    console.error("Failed to fetch contact:", err);
    res.status(500).json({ error: "Failed to fetch contact", details: err.message });
  }
});

// Create a new contact
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = new Contact({ name, email, phone });

    // Save and handle validation/duplicate errors
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    console.error("Failed to create contact:", err);

    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: "Validation Error", details: messages });
    }

    if (err.code === 11000) {
      return res.status(400).json({ error: "Duplicate field", details: err.keyValue });
    }

    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Update a contact
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Contact not found" });
    res.json(updated);
  } catch (err) {
    console.error("Failed to update contact:", err);
    res.status(500).json({ error: "Failed to update contact", details: err.message });
  }
});

// Delete a contact
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Contact not found" });
    res.json({ message: "Contact deleted" });
  } catch (err) {
    console.error("Failed to delete contact:", err);
    res.status(500).json({ error: "Failed to delete contact", details: err.message });
  }
});

module.exports = router;
