const { ObjectId } = require("mongodb");

// Wrapper for async functions to catch errors
const asyncHandler = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};

// Validate MongoDB ObjectId (returns ObjectId or throws error)
const validateObjectId = (id) => {
	if (!ObjectId.isValid(id)) {
		const error = new Error("Invalid ID format");
		error.statusCode = 400;
		throw error;
	}
	return new ObjectId(id);
};

// Middleware version for validating params and attaching ObjectId to req.params
const validateObjectIdParam = (paramName) => (req, res, next) => {
	const id = req.params[paramName];
	if (!ObjectId.isValid(id)) {
		return res.status(400).json({ error: "Invalid ID format" });
	}
	// Replace string id with ObjectId instance for downstream handlers
	req.params[paramName] = new ObjectId(id);
	next();
};

// Centralized error handler middleware
const errorHandler = (err, req, res, next) => {
	const status = err.statusCode || err.status || 500;
	res.status(status).json({ error: err.message || "Internal Server Error" });
};

module.exports = {
	asyncHandler,
	validateObjectId,
	validateObjectIdParam,
	errorHandler,
};
