const { Contact } = require("../models/contact");

const getAll = async () => {
	return Contact.find({}, {}, {});
};

const getById = async (contactId) => {
	return Contact.findById(contactId);
};

const create = async (contact) => {
	return Contact.create(contact);
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
