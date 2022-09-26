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
const { validateRequest } = require("../../middlewares/validateRequest");

router.get("/", getAll);
router.get("/:contactId", getById);
router.post("/", validateRequest(schemaAdd), create);
router.put("/:contactId", validateRequest(schemaUpdate), updateById);
router.patch(
	"/:contactId/favorite",
	validateRequest(schemaUpdateFavorite),
	updateStatusContact
);
router.delete("/:contactId", deleteById);

module.exports = router;
