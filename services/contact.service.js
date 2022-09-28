const { Contact } = require("../models/contact");

const getAll = async (query) => {
	const { page, limit } = query;
	const skipped = (page - 1) * limit;
	const skip = skipped < 0 ? 0 : skipped;

	return Contact.find({}, {}, { skip, limit: +limit }).populate(
		"owner",
		"subscription"
	);
};

const getById = async (contactId) => {
	return Contact.findById(contactId);
};

const create = async (contact, id) => {
	return Contact.create({ ...contact, owner: id });
};

const updateById = async (contactId, contact) => {
	return Contact.findByIdAndUpdate(contactId, contact, { new: true });
};

const deleteById = async (contactId) => {
	return Contact.findByIdAndDelete(contactId);
};

module.exports = {
	updateById,
	create,
	getById,
	getAll,
	deleteById,
};
