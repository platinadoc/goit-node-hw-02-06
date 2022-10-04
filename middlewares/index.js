const { author, auth } = require("./auth");
const { validateId } = require("./verifyId");
const { validateRequest } = require("./validateRequest");
const { upload } = require("./upload");

module.exports = {
	auth,
	author,
	upload,
	validateId,
	validateRequest,
};
