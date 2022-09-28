const { contacts, email } = require("../services");
const { createError } = require("../helpers/error");

const getAll = async (req, res, next) => {
	try {
		const allContacts = await contacts.getAll(req.query);
		res.status(200).json(allContacts);
	} catch (error) {
		next(error);
	}
};

const getById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contactById = await contacts.getById(contactId);
		if (!contactById) {
			throw createError(404, "Not found");
		}
		res.status(200).json(contactById);
	} catch (error) {
		next(error);
	}
};

const create = async (req, res, next) => {
	try {
		const { _id } = req.user;
		const newContact = await contacts.create(req.body, _id);
		res.status(201).json(newContact);
	} catch (error) {
		if (error.message.includes("duplicate")) {
			error.status = 400;
		}
		next(error);
	}
};

const updateById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const updatedContact = await contacts.updateById(contactId, req.body);
		if (!updatedContact) {
			throw createError(404, "Not found");
		}
		res.status(201).json(updatedContact);
	} catch (error) {
		next(error);
	}
};

const updateStatusContact = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const updatedContact = await contacts.updateById(contactId, req.body);
		if (!updatedContact) {
			throw createError(404, "Not found");
		}
		res.status(201).json(updatedContact);
	} catch (error) {
		next(error);
	}
};

const deleteById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const removeContactById = await contacts.deleteById(contactId);
		if (!removeContactById) {
			throw createError(404, "Not found");
		}
		res.status(200).json({ message: "contact deleted" });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAll,
	getById,
	create,
	updateById,
	deleteById,
	updateStatusContact,
};
