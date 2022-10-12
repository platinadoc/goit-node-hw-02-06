require("dotenv").config();
const { PORT, DB_HOST, SECRET_KEY, SENDGRID_API_KEY, EMAIL_SENDER } = process.env;

module.exports = {
	PORT,
	DB_HOST,
	SECRET_KEY,
	SENDGRID_API_KEY,
	EMAIL_SENDER,
};
