const { getDatabase } = require("../data/database");
const { asyncHandler, validateObjectId } = require("../helpers");

// Reusable validation function
const validateContactFields = (body) => {
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "favoriteColor",
    "birthday",
    "phone",
    "address",
  ];

  const missing = requiredFields.filter((field) => !body[field]);
  if (missing.length > 0) {
    return `Missing required fields: ${missing.join(", ")}`;
  }

  return null;
};

// GET /api/contacts
const getAllContacts = asyncHandler(async (req, res) => {
  const db = getDatabase();
  
  // Week 04 prep: Filter by userId
  // const userId = req.user.id;
  // const contacts = await db.collection("contacts").find({ userId }).toArray();

  const contacts = await db.collection("contacts").find({}).toArray();
  res.status(200).json(contacts);
});

// GET /api/contacts/:id
const getContactById = asyncHandler(async (req, res) => {
  const db = getDatabase();
  const { id } = req.params;
  const objectId = validateObjectId(id);

  const contact = await db.collection("contacts").findOne({ _id: objectId });
  if (!contact) {
    return res.status(404).json({ error: "Contact not found" });
  }

  res.status(200).json(contact);
});

// POST /api/contacts
const createContact = asyncHandler(async (req, res) => {
  const db = getDatabase();
  const error = validateContactFields(req.body);
  if (error) return res.status(400).json({ error });

  const { email } = req.body;

  // Check for existing contact with same email
  const existing = await db.collection("contacts").findOne({ email });
  if (existing) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const newContact = {
    ...req.body,
    // userId: req.user.id, // Uncomment in Week 04
  };

  const result = await db.collection("contacts").insertOne(newContact);
  res.status(201).json({
    message: "Contact created successfully",
    contact: { _id: result.insertedId, ...newContact },
  });
});

// PUT /api/contacts/:id
const updateContact = asyncHandler(async (req, res) => {
  const db = getDatabase();
  const { id } = req.params;
  const objectId = validateObjectId(id);

  const error = validateContactFields(req.body);
  if (error) return res.status(400).json({ error });

  const { email } = req.body;

  // Prevent email conflicts
  const existing = await db.collection("contacts").findOne({
    email,
    _id: { $ne: objectId },
  });

  if (existing) {
    return res.status(409).json({ error: "Email already in use by another contact" });
  }

  const updatedContact = {
    ...req.body,
    // userId: req.user.id, // Uncomment in Week 04
  };

  const result = await db
    .collection("contacts")
    .updateOne({ _id: objectId }, { $set: updatedContact });

  if (result.matchedCount === 0) {
    return res.status(404).json({ error: "Contact not found" });
  }

  res.status(200).json({
    message: "Contact updated successfully",
    contact: { _id: objectId, ...updatedContact },
  });
});

// DELETE /api/contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
  const db = getDatabase();
  const { id } = req.params;
  const objectId = validateObjectId(id);

  const result = await db.collection("contacts").deleteOne({ _id: objectId });

  if (result.deletedCount === 0) {
    return res.status(404).json({ error: "Contact not found" });
  }

  res.status(200).json({ message: "Contact deleted successfully" });
});

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
