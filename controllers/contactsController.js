const { getDatabase } = require("../data/database");
const { asyncHandler, validateObjectId } = require("../helpers");

// Get all contacts
const getAllContacts = asyncHandler(async (req, res) => {
	const db = getDatabase();
	const contacts = await db.collection("contacts").find({}).toArray();
	res.status(200).json(contacts);
});

// Get a single contact by ID
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

// Create a new contact
const createContact = asyncHandler(async (req, res) => {
	const db = getDatabase();
	const { firstName, lastName, email, favoriteColor, birthday, phone, address } = req.body;

	// Validate that all fields are provided
	if (!firstName || !lastName || !email || !favoriteColor || !birthday || !phone || !address) {
		return res.status(400).json({ error: "All fields are required" });
	}

	const newContact = {
		firstName,
		lastName,
		email,
		favoriteColor,
		birthday,
		phone,
		address,
	};

	const result = await db.collection("contacts").insertOne(newContact);
	res.status(201).json({
		message: "Contact created successfully",
		contact: { _id: result.insertedId, ...newContact },
	});
});

// Update a contact
const updateContact = asyncHandler(async (req, res) => {
	const db = getDatabase();
	const { id } = req.params;
	const objectId = validateObjectId(id);
	const { firstName, lastName, email, favoriteColor, birthday, phone, address } = req.body;

	// Validate that all fields are provided
	if (!firstName || !lastName || !email || !favoriteColor || !birthday || !phone || !address) {
		return res.status(400).json({ error: "All fields are required" });
	}

	const updatedContact = {
		firstName,
		lastName,
		email,
		favoriteColor,
		birthday,
		phone,
		address,
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

// Delete a contact
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
