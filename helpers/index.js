const { ObjectId } = require("mongodb");

const asyncHandler = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};

const validateObjectId = (id) => {
	if (!ObjectId.isValid(id)) {
		const error = new Error("Invalid ID format");
		error.status = 400;
		throw error;
	}
	return new ObjectId(id);
};

module.exports = {
	asyncHandler,
	validateObjectId,
};
