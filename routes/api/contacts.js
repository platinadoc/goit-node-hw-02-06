const express = require("express");
const router = express.Router();
const {
	getAll,
	getById,
	create,
	updateById,
	deleteById,
	updateStatusContact,
} = require("../../controllers/contacts");

const {
	schemaAdd,
	schemaUpdate,
	schemaUpdateFavorite,
} = require("../../models/contact");

const { validateId, validateRequest, auth } = require("../../middlewares");

router.get("/", auth, getAll);
router.get("/:contactId", auth, validateId, getById);
router.post("/", validateRequest(schemaAdd), auth, create);
router.put("/:contactId", validateRequest(schemaUpdate), auth, validateId, updateById);
router.patch(
	"/:contactId/favorite",
	validateRequest(schemaUpdateFavorite), auth, validateId, updateStatusContact
);
router.delete("/:contactId", auth, validateId, deleteById);

module.exports = router;
